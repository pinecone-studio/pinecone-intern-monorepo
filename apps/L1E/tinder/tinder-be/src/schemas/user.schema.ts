import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    interest: String!
    password: String!
    hobby: String
    bio: String!
    profession: String!
    job: String!
    age: String!
    images: [String!]!
    createdAt: Date!
    updatedAt: Date!
  }

  input RegisterInput {
    email: String!
    password: String!
    username: String!
    interest: String!
    images: [String!]!

    bio: String!
    profession: String!
    job: String!
    age: String!
    hobby: String!
  }

  input UpdateInput {
    username: String!
    bio: String!
    interest: String!
    images: [String!]!
    email: String!
    age: String!
    hobby: String!
    job: String!
    profession: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  type RequestOtpResponse {
    email: String!
  }

  input RequestOtpInput {
    email: String!
    otp: String!
  }

  input ChangePasswordInput {
    email: String!
    password: String!
    otp: String!
  }

  type ChangePasswordResponse {
    message: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(userId: ID!): User!
    getUserByUsername(username: String!): User!
    getUserBySearch(searchInput: String!): [User!]
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
