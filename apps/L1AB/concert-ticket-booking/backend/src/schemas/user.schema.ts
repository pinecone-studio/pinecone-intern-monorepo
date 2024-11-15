import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
    role: String
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }
  type Mutation {
    createUser(input: UserInput!): User!
  }
`;
