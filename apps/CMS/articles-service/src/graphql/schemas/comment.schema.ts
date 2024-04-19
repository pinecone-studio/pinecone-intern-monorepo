import { gql } from 'graphql-tag';

export const commentsSchema = gql`
  scalar Date
  type Comment {
    id: ID!
    userName: String
    comment: String!
    createdAt: Date!
    ipAddress: String!
    articleId: ID!
  }
  type Query {
    getCommentsByArticleId(articleId: ID!): [Comment]
  }
`;
