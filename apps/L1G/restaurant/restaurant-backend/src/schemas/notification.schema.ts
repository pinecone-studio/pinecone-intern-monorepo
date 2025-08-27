import { gql } from 'apollo-server-cloud-functions';
export const notification = gql`
  type Notification {
  id: ID!
  userId: ID!
  message: String!
  seen: Boolean!
  createdAt: String!
}

type Query {
  notifications(userId: ID!): [Notification!]!
  unreadCount(userId: ID!): Int!
}

type Mutation {
  createNotification(userId: ID!, message: String!): Notification!
  markAsSeen(id: ID!): Notification!
}

type Subscription {
  notificationReceived(userId: ID!): Notification!
}
import { gql } from 'apollo-server-cloud-functions';
`;
