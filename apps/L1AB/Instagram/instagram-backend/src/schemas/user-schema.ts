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
  }
  input RegisterInput {
    fullname: String!
    username: String!
    email: String!
    password: String!
  }
  type Mutation {
    deleteUser(_id: ID): User!
    createUser(input: RegisterInput!): User!
  }
`;
