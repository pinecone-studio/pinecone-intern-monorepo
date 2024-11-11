import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    profilePicture: [String!]!
    bio: String!
    isPrivave: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
`;
