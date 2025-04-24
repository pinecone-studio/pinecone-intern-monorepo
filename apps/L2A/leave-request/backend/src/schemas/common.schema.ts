import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON
scalar Date

type User {
  id: ID!
  username: String!
  email: String!
  profilePicture: String!
  createdAt: Date!
  updatedAt: Date!
}`;

