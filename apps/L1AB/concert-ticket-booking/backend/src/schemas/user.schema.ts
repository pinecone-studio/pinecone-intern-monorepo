import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    phone: String!
    role: String
  }
`;
