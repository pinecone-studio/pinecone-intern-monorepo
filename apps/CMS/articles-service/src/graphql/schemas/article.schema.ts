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

  input PaginationInput {
    limit: Int!
    page: Int!
  }

  input FilterInput {
    status: String
    searchedValue: String
    startDate: Date
    endDate: Date
  }

  type PaginationReturn {
    articles: [Article!]!
    totalArticles: Int!
  }

  type Message {
    message: String!
  }
  type Mutation {
    createArticle(articleInput: CreateArticleInput!): Article!
    updateArticle(_id: ID!, title: String!, content: String!, category: ID!, coverPhoto: String, commentPermission: Boolean!): Article!
    updateArticleStatusById(_id: ID!, newStatus: String!): Article!
    deleteArticleById(_id: ID!): Message!
  }

  type Query {
    getArticlesQuery: [Article!]!
    getArticleByID(id: ID!): Article!
    getArticlesByCategory(categoryId: String!, quantity: Int!): [Article!]!
    getArticlesByCategoryNoLimit(categoryId: String!): [Article!]!
    getArticlesByQuantity(quantity: Int!): [Article]!
    getNewestArticle: Article!
    getArticlesByAuthorId(_id: ID!): [Article]!
    getArticlesByStatus(status: String!): [Article!]!
    getArticlesByPaginate(paginationInput: PaginationInput!, filterInput: FilterInput!): PaginationReturn!
  }
`;
