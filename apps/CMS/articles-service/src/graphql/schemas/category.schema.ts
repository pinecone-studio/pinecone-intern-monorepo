import { gql } from 'graphql-tag';

export const categorySchema = gql`
  scalar Date
  type Category {
    id: ID!
    name: String!
    createdAt: Date
  }
  type Query {
    getCategories:[Category!]!
  } 
  type Mutation {
    createCategory(name: String!): Category!
  }
`;
