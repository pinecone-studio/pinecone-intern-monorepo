import { gql } from 'graphql-tag';

export const reactionSchema = gql`
  type Reaction {
    id: ID!
    emoji: String!
    users: [User] 
    count: Int!
    articleId: Article
    category: Category 
  }

  enum EmojiEnum {
    like
    dislike
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: String!
    articles: [Article]
    otp: String
  }

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
    publishAt: Date
    updatedAt: Date
  }

  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
    SCHEDULED
  }

  type Category {
    id: ID!
    name: String!
    createdAt: Date
  }

  type Query {
    getReactionByArticleId(articleId: ID!): [Reaction]
  }
`;
