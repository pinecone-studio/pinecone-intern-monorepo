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
`;
