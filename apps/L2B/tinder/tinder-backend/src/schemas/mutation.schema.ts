import gql from 'graphql-tag';

export const mutationTypeDefs = gql`
  scalar JSON

  scalar Date

  type Mutation {
    sendOTP(email: String!): User!
    isVerified(email: String!, otp: String!): String!
    addUser(email: String!, password: String!): User!
    deleteUser: Boolean
  }
`;
