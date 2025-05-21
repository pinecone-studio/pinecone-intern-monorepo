import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    birth: Date
    emergencyPhone: String
    relation: String
    isAdmin: Boolean!
    phone: String
  }

  type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
    getCurrentUser(JWT: String!): User!
  }

  input ContactInput {
    phone: String!
    email: String!
    emergencyPhone: String!
    relation: String!
  }

  type Mutation {
    addUser(email: String!, password: String!): User!
    updatePersonalInformation(_id: ID!, firstName: String!, lastName: String!, birth: Date!): User!
    updateContact(_id: ID!, input: ContactInput!): User!
    updatePassword(_id: ID!, password: String!): User!
  }
`;
