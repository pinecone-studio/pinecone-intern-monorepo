import { gql } from 'graphql-tag';

export const articleTypeDefs = gql`
  scalar Date

  type Article {
    _id: ID!
    title: String!
    content: String!
    coverPhoto: String!
    author: String!
    status: String!
    slug: String
    category: [Category!]!
    createdAt: Date!
    publishedAt: Date!
    updatedAt: Date!
    scheduledAt: Date!
  }

  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }

  input ArticleInput {
    title: String!
    content: String!
    coverPhoto: String!
    author: String!
    status: String!
    slug: String
    category: String!
    createdAt: Date
    publishedAt: Date
    updatedAt: Date
    scheduledAt: Date
  }
  
  type Query {
    getArticles: [Article!]!
  }

  type Mutation {
    createArticle(articleInput: ArticleInput!): Article
    updateArticle(id: ID!, articleInput: ArticleInput!): Article
    deleteArticle(id: ID!): Article
  }
`;
