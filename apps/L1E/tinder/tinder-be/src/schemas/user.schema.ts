import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    fullname: String!
    interest: String!
    password: String!
    profilePicture: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User!
    getUserByUsername(username: String!): User!
    getUserBySearch(searchInput: String!): [User!]
  }

  input RegisterInput {
    email: String!
    password: String!
    fullname: String
    username: String
  }

  input UpdateInput {
    fullname: String!
    username: String!
    bio: String!
    interest: String!
    profilePicture: String!
  }

  type AuthPayload {
    token: String!
  }

  type RequestOtpResponse {
    email: String!
  }

  input RequestOtpInput {
    email: String!
  }

  input ChangePasswordInput {
    email: String!
    password: String!
    otp: String!
  }

  type ChangePasswordResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    deleteUser(_id: ID): User!
    createUser(input: RegisterInput!): User!
    updateUser(input: UpdateInput!, _id: ID!): User!
    login(username: String, email: String, password: String!): AuthPayload!
    signup(fullname: String!, username: String!, email: String!, password: String!): User!
    requestOtp(input: RequestOtpInput!): RequestOtpResponse!
    changePassword(input: ChangePasswordInput!): ChangePasswordResponse!
  }
`;
