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
    email: String!
  }

  type VerifyOtpType {
    success: Boolean!
  }

  type RegisterType {
    success: Boolean!
  }

  type ForgetRequestOtpType {
    success: Boolean!
    email: String!
  }

  type ForgetVerifyOtpType {
    success: Boolean!
  }

  type ForgetPasswordType {
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

  input ForgetRequestOtpInput {
    email: String!
  }

  input ForgetVerifyOtpInput {
    verifyOtp: Int!
    email: String!
  }

  input ForgetPasswordInput {
    password: String!
    email: String!
  }

  input SignInInput {
    email : String!
    password : String!
  }

  type SignInResponse {
    user : User
    token : String!
  }
  

  type Mutation {
    requestOTP(input: RequestOtpInput!): RequestOtpType!
    verifyOTP(input: VerifyOtpInput!): VerifyOtpType!
    register(input: RegisterInput!): RegisterType!
    forgetRequestOTP(input: ForgetRequestOtpInput!): ForgetRequestOtpType!
    forgetVerifyOTP(input: ForgetVerifyOtpInput!): ForgetVerifyOtpType!
    forgetPassword(input: ForgetPasswordInput!): ForgetPasswordType!
    signIn(input : SignInInput!) :SignInResponse!
  }
`;
