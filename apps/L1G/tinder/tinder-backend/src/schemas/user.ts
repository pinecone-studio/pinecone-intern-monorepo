import gql from 'graphql-tag';

export const UsertypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    images: [String]
    likedBy: [User]
    likedTo: [User]
    matched: [User]
  }

  type Query {
    getusers: [User]
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): User
    login(email: String!, password: String!): String
    like(likedByUser: ID!, likeReceiver: ID!): String
    dislike(dislikedByUser: ID!, dislikeReceiver: ID!): String
  }
`;
