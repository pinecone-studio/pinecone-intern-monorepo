import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    fullname: String!
    gender: String!
    password: String!
    profilePicture: String!
    bio: String!
    isPrivate: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User!
    getUserByUsername(username: String!): User!
  }
  input RegisterInput {
    fullname: String!
    username: String!
    email: String!
    password: String!
  }
  input UpdateInput {
    fullname: String!
    username: String!
    bio: String!
    gender: String!
    profilePicture: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Mutation {
    deleteUser(_id: ID): User!
    createUser(input: RegisterInput!): User!
    updateUser(input: UpdateInput!, _id: ID!): User!
    login(username: String, email: String, password: String!): AuthPayload!
    signup(fullname: String!, username: String!, email: String!, password: String!): User!
  }
`;
