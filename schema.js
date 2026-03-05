// schema.js
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
  directive @hasRole(role: String!) on FIELD_DEFINITION

  type Recipe {
    id: ID!
    name: String!
    time: Int!
    description: String!
    category: String
  }

  type Query {
    recipes(search: String, category: String): [Recipe]
    recipe(id: ID!): Recipe @hasRole(role: "USER")
  }

  type Mutation {
    createRecipe(name: String!, time: Int!, description: String!, category: String): Recipe @hasRole(role: "USER")
    deleteRecipe(id: ID!): Boolean
    updateRecipe(id: ID!, name: String, time: Int, description: String, category: String): Recipe
  }
`;

module.exports = { typeDefs };