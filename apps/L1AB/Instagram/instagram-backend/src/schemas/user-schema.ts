import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    fullname: String!
    password: String!
    profilePicture: String!
    bio: String!
    isPrivate: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
`;