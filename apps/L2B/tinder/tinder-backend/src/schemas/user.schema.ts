import gql from 'graphql-tag';

export const userTypeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    _id: ID!
    email: String!
    password: String!
    isVerified: Boolean
    verficationCode: String!
    createdAt: String
    updatedAt: String
  }
`;
