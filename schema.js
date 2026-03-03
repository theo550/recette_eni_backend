const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Recipe {
    id: ID!
    name: String!
    time: Int!
    description: String!
    category: String
  }

  type Query {
    recipes(search: String, category: String): [Recipe]
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(name: String!, time: Int!, description: String!, category: String): Recipe
    deleteRecipe(id: ID!): Boolean
    updateRecipe(id: ID!, name: String, time: Int, description: String, category: String): Recipe
  }
`);