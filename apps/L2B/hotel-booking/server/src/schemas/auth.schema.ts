import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  type SuccessResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    requestPasswordReset(email: String!): SuccessResponse!
    verifyPasswordResetOTP(email: String!, otp: String!): SuccessResponse!
    resetPassword(email: String!, password: String!): SuccessResponse!

    login(email: String!, password: String!): AuthPayload!
  }
`;
