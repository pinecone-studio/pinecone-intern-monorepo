import gql from 'graphql-tag';

export const typeDefs = gql`
  input AddCategoryInput {
    name: String!
  }
  input UpdateCategoryInput {
    _id: ID!
    name: String!
  }
  input DeleteCategoryInput {
    _id: ID!
  }
`;
