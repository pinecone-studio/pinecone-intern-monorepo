import { gql } from 'graphql-tag';

export const articleSchema = gql`
  scalar Date
  type Article {
    id: ID!
    title: String!
    coverPhoto: String!
    content: String!
    author: User!
    category: Category!
    status: ArticleStatus!
    slug: String!
    commentPermission: Boolean!
    createdAt: Date!
    publishedAt: Date!
    updatedAt: Date
    scheduledAt: Date
  }
  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }

  input CreateArticleInput {
    title: String!
    coverPhoto: String!
    content: String!
    author: ID!
    category: ID!
    status: String!
    slug: String!
    commentPermission: Boolean!
  }

  type Mutation {
    createArticle(articleInput: CreateArticleInput!): Article!
  }

  type Query {
    getArticlesQuery: [Article]!
    getArticleByID(id: ID!): Article!
    getArticlesByCategory(categoryId: String!, getAll: Boolean!): [Article!]!
    getArticlesByCategoryNoLimit(categoryId: String!): [Article!]!
    getArticlesByQuantity(quantity: Int!): [Article]!
    getNewestArticle: Article!
    getArticlesByAuthorId(_id: ID!): [Article]!
  }
`;
