import gql from 'graphql-tag';

export const userTypeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    _id: ID!
    email: String!
    password: String
    isVerified: Boolean
    verficationCode: String!
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    sendOTP(email: String!): User!
    isVerified(email: String!, otp: String!): String!
    addUser(email: String!, password: String!): User!
    deleteUser: Boolean
    sendForgotOtp(email: String!): String!
    forgotMatchOtp(email: String!, otp: String!): String!
    forgotPassword(email: String!, password: String!): User!
    signIn(email: String!, password: String!): String!
  }
`;
