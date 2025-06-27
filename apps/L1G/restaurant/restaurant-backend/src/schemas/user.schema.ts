import { gql } from 'apollo-server-cloud-functions';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profile: String
    password: String!
    bonusPoints: Int
    role: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(_id: ID!, username: String, email: String, password: String, profile: String): User!
    deleteUser(_id: ID!): User!
  }
`;
