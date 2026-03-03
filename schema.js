const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Recipe {
    id: ID!
    name: String!
    time: Int!
    description: String!
  }

  type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(name: String!, time: Int!, description: String!): Recipe
  }
`);