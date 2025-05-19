import gql from 'graphql-tag';

export const mutationTypeDefs = gql`
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

  type SignInResponse {
    message: String!
    token: String!
    user: User!
  }

  type Mutation {
    sendOTP(email: String!): User!
    isVerified(email: String!, otp: String!): String!
    addUser(email: String!, password: String!): User!

    signIn(email: String!, password: String!): SignInResponse!

    deleteUser: Boolean

  }
`;
