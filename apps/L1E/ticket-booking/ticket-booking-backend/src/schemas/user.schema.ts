import { gql } from 'apollo-server-cloud-functions';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
    role: String!
    phone: String
    otp: String
    otpExpiresAt: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createUser(
      fullName: String!, 
      email: String!, 
      password: String!, 
      role: String, 
      phone: String
    ): User!
    updateUser(
      _id: ID!, 
      fullName: String, 
      email: String, 
      role: String, 
      phone: String
    ): User!
    deleteUser(_id: ID!): User!
  }
`;