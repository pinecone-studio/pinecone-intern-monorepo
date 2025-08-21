import { gql } from 'apollo-server-cloud-functions';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(_id: ID!, name: String, email: String): User!
    deleteUser(_id: ID!): User!
  }
`;