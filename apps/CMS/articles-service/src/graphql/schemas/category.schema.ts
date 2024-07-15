import { gql } from 'apollo-server-cloud-functions';

export const categoryTypeDefs = gql`
  type Category {
    _id: ID!
    name: String
  }

  type Query {
    getCategory(_id: ID!): Category!
    getCategories: [Category!]!
  }

  type Mutation {
    createCategory(name: String!): Category!
    updateCategory(_id: ID!, name: String!): Category!
  }
`;
