import { gql } from 'graphql-tag';

export const articleSchema = gql`
  scalar Date
  type Article {
    id: ID!
    title: String!
    coverPhoto: String
    content: String!
    author: User!
    category: Category!
    status: ArticleStatus!
    slug: String!
    createdAt: Date
    publishedAt: Date
    updatedAt: Date
    scheduledAt: Date
  }
  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }
`;
