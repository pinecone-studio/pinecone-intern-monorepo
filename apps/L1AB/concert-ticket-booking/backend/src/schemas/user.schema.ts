import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
    role: String
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  input SignUpUser {
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  input UserUpdateInput {
    userId: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  type Mutation {
    signUpUser(input: SignUpUser!): AuthResponse!
    createUser(input: SignUpUser!): User!
    updateUser(input: UserUpdateInput!): User!
  }
  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User!
  }
`;
