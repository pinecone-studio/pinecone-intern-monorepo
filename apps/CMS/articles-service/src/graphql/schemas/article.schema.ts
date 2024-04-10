import { gql } from 'graphql-tag';

export const articleSchema = gql`
  scalar Date
  type Article {
    id: ID!
    title: String!
    coverPhoto: String
    content: String!
    author: User!
    category: Category
    status: ArticleStatus
    slug: String
    createdAt: Date
    publishAt: Date
    updatedAt: Date
  }
  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }
`;
