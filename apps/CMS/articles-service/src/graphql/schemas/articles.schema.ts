import { gql } from 'graphql-tag';

export const articleTypeDefs = gql`
  scalar Date

  type Article {
    _id: ID
    title: String
    coverPhoto: String
    content: String
    author: String
    status: ArticleStatus
    slug: String
    createdAt: Date
    publishedAt: Date
    updatedAt: Date
    articleId: String
  }

  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }

  input CreateArticleInput {
    articleId: String
    title: String
    coverPhoto: String
    content: String
    author: String
    status: ArticleStatus
    slug: String
  }

  input UpdateArticleInput {
    title: String
    coverPhoto: String
    content: String
    status: ArticleStatus
    slug: String
  }

  type Query {
    getArticles: [Article!]!
  }

  type Mutation {
    createArticle(articleInput: CreateArticleInput): Article!
    updateArticle(_id: String!, input: UpdateArticleInput): Article!
  }
`;
