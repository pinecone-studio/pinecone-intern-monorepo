/* eslint-disable no-secrets/no-secrets */
import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    _id: ID!
    password: String!
    email: String!
  }

  input UserInput {
    password: String!
    email: String!
  }

  input UpdateUserEmailType {
    _id: ID!
    newEmail: String!
  }
  type UpdatedUserEmailType {
    _id: ID!
    newEmail: String!
  }
  input UpdateUserNumberType {
    _id: ID!
    newPhoneNumber: String!
  }
  type UpdatedUserNumberType {
    _id: ID!
    newPhoneNumber: String!
  }
  input UpdateUserPasswordType {
    _id: ID!
    newPassword: String!
    newRePassword: String!
  }
  type UpdatedUserPasswordType {
    _id: ID!
    newPassword: String!
  }
  input UpdateUserImageType {
    _id: ID!
    profileImage: String!
  }
  type UpdatedUserImageType {
    _id: ID!
    profileImage: String!
  }
  input RequestChanGePasswordInput {
    email: String!
  }

  type RequestChanGePasswordResponse {
    email: String!
  }

  input ChangePasswordType {
    _id: ID!
    newPassword: String!
    newRePassword: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }
  input NewpasswordInput {
    email: String!
    newPassword: String!
  }
  type NewPassword {
    password: String!
    email: String!
  }
  input orderNewPassword {
    oldPassword: String!
    newPassword: String!
    userId: String!
  }
  type UserType {
    _id: ID!
    email: String!
    profileImage: String!
    phoneNumber: String!
    createdAt: Date!
  }

  type Mutation {
    signUp(input: UserInput!): User!
    signIn(input: UserInput!): AuthResponse!
    updatePassword(input: NewpasswordInput!): NewPassword!
    newPassword(input: orderNewPassword!): NewPassword!
  }
  input UpdateForgetPasswordInput {
    email: String!
    otp: String!
  }

  type UpdateForgetPasswordPayload {
    token: String!
    user: User!
  }

  type User {
    email: String!
    otp: String
  }

  input RequestOtpInput {
    email: String!
    otp: String
  }

  type RequestOtpPayload {
    success: Boolean!
    message: String!
    email: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    rePassword: String!
  }

  type Query {
    sampleQuery: String!
    getUser(_id: ID!): User!
    getUsers: [User!]
  }

  type Mutation {
    requestOtp(input: RequestOtpInput!): RequestOtpPayload!

    sampleMutation: String!
    createUser(input: RegisterInput!): AuthResponse!
    loginUser(input: UserInput!): AuthResponse!

    UpdateForgetPasswordInput(input: UpdateForgetPasswordInput!): UpdateForgetPasswordPayload!
    changePassword(input: ChangePasswordType!): Response!
    RequestChangePassword(input: RequestChanGePasswordInput!): RequestChanGePasswordResponse!

    updateEmailUser(input: UpdateUserEmailType!): User!
    updateNumberUser(input: UpdateUserNumberType!): User!
    updatePasswordUser(input: UpdateUserPasswordType!): Response!
    updateUserImage(input: UpdateUserImageType!): User!
  }
`;
