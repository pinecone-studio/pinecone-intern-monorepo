/* eslint-disable no-secrets/no-secrets */
import gql from 'graphql-tag';

export const userTypeDefs = gql`
  scalar JSON
  scalar Date
  enum Response {
    Success
  }
  enum Role {
    user
    admin
  }
  input RegisterInput {
    userName: String!
    email: String!
    password: String!
    rePassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type UserType {
    _id: ID!
    userName: String!
    email: String!
    profileImage: String
    phoneNumber: String
    role: Role!
    wallet: Int!
    createdAt: Date!
  }
  input UpdateUserNameType {
    _id: ID!
    newUserName: String!
  }
  type UpdatedUserNameType {
    _id: ID!
    newUserName: String!
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
    password: String!
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
  input UpdateForgetPassword {
    email: String!
    otp: String!
  }
  type UpdatedForgetPassword {
    user: UserType!
    token: String!
  }
  input RequestChangePasswordInput {
    email: String!
  }

  type RequestChangePasswordResponse {
    email: String!
  }

  input ChangePasswordType {
    _id: ID!
    newPassword: String!
    newRePassword: String!
  }
  type Query {
    sampleQuery: String!
    getUser(_id: ID!): UserType!
    getUsers: [UserType!]
  }
  type Mutation {
    sampleMutation: String!
    createUser(input: RegisterInput!): UserType!
    loginUser(input: LoginInput!): UserType!

    updateForgetPassword(input: UpdateForgetPassword!): UpdatedForgetPassword!
    requestChangePassword(input: RequestChangePasswordInput!): RequestChangePasswordResponse!
    changePassword(input: ChangePasswordType!): Response!

    updateNameUser(input: UpdateUserNameType!): UserType!
    updateEmailUser(input: UpdateUserEmailType!): UserType!
    updateNumberUser(input: UpdateUserNumberType!): UserType!
    updatePasswordUser(input: UpdateUserPasswordType!): Response!
    updateUserImage(input: UpdateUserImageType!): UserType!
  }
`;
