import gql from 'graphql-tag';

export const typeDefs = gql`
  type Notifications {
    _id: ID!
    userId: ID!
    postId: ID!
    notifiedUserId: ID!
    type: String!
    createdAt: Date!
  }
  type Query {
    getNotificationsByUserId(userId: ID!): [Notifications]!
  }
`;
