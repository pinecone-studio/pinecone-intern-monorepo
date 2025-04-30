import gql from "graphql-tag";

export const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getCategories: [Category!]!
  }

    type Mutation {
    addCategory(name: String!): Category!
    updateCategory(_id: ID!, name: String!): Category!
    deleteCategory(_id: ID!): Category!
  }
`;