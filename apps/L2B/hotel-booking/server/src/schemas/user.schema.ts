import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    birth: Date
    relation: String
    isAdmin: Boolean!
    phone: Int
  }

  type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    addUser(email: String!, password: String!): User!
  }
`;
