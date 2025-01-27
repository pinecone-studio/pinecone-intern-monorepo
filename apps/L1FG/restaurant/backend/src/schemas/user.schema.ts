import gql from 'graphql-tag';

export const userTypeDefs = gql`
  scalar JSON
  scalar Date
  enum Response {
    Success
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
    createdAt: Date!
  }
  input UpdateUserNameType {
    _id: ID!
    userName: String!
  }
  type UpdatedUserNameType {
    _id: ID!
    userName: String!
  }
  type Query {
    sampleQuery: String!
    getUser(_id: ID!): UserType!
  }
  type Mutation {
    sampleMutation: String!
    createUser(input: RegisterInput!): UserType!
    loginUser(input: LoginInput!): UserType!

    updateUser(input: UpdateUserNameType!): UpdatedUserNameType!
  }
`;
