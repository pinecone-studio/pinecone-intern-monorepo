import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    firstName: String
    lastName: String
    birthDate: Date
    email: String!
    phoneNumber: String
    emergencyContact: [String]
    status: String
    password: String!
  }

  type RegisterUserResponse {
    user: User!
    token: String!
  }

  input RegisterUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterUserInput!): RegisterUserResponse!
  }
`;
