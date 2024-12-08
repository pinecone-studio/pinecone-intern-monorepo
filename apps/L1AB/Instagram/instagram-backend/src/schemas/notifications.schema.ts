import gql from 'graphql-tag';

export const typeDefs = gql`
  type PostWithNoPopulate {
    _id: ID!
    userId: ID!
    images: [String!]!
    caption: String!
    createdAt: Date!
    updatedAt: Date!
  }
  type Notifications {
    _id: ID!
    userId: User!
    postId: PostWithNoPopulate!
    notifiedUserId: ID!
    type: String!
    createdAt: Date!
  }
  type Query {
    getNotificationsByUserId(userId: ID!): [Notifications]!
  }
`;
