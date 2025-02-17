import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    firstName: String
    lastName: String
    birthDate: Date
    email: String!
    phoneNumber: String
    emergencyContact: [String]
    status: String
    password: String
    otp: Int
  }

  type RequestOtpType {
    success: Boolean!
  }

  type VerifyOtpType {
    success: Boolean!
  }

  type RegisterType {
    success: Boolean!
  }

  input RequestOtpInput {
    email: String!
  }

  input VerifyOtpInput {
    verifyOtp: Int!
    email: String!
  }

  input RegisterInput {
    password: String!
    email: String!
  }

  type Mutation {
    requestOTP(input: RequestOtpInput!): RequestOtpType!
    verifyOTP(input: VerifyOtpInput!): VerifyOtpType!
    register(input: RegisterInput!): RegisterType!
  }
`;
