import gql from 'graphql-tag';

export const categoryTypeDefs = gql`
  scalar Date
  enum ArticleStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }
  type Category {
    _id: ID!
    name: String!
    createdAt: Date
  }

  input CreateCategoryInput {
    name: String!
    createdAt: Date
  }

  input CategoryInput {
    name: String!
  }

  type Query {
    getCategories: [Category!]!
  }

  type Mutation {
    createCategory(categoryInput: CreateCategoryInput!): Category!
  }
`;
