require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { typeDefs, makeExecutableSchema } = require('./schema');
const resolvers = require("./resolvers");
const { hasRoleDirectiveTransformer } = require('./directives/hasRoles');

const app = express();

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = hasRoleDirectiveTransformer(schema);

app.use("/graphql", createHandler({
    schema,
    rootValue: resolvers,
    context: async (req) => {
        const authHeader = req.raw.headers['authorization'];
        if (!authHeader?.startsWith('Bearer ')) return { user: null };

        try {
            const token = authHeader.split(' ')[1];
            const user = await verifyToken(token);
            return { user };
        } catch (err) {
            console.warn('Invalid token:', err.message);
            return { user: null };
        }
    }
}));

app.listen(process.env.PORT, () => {
    console.log(`🚀 API ready at http://localhost:${process.env.PORT}/graphql`);
});