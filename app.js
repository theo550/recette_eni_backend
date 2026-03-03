require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();

app.use("/graphql", createHandler({ schema, rootValue: resolvers }));

app.listen(process.env.PORT, () => {
    console.log(`🚀 API ready at http://localhost:${process.env.PORT}/graphql`);
});