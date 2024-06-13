import gql from 'graphql-tag';

export const categoryTypeDefs = gql`
  input CreateCategoryInput {
    title: String!
    coverPhoto: String!
    content: String!
    author: ID
    categoryId: ID
    status: ArticleStatus!
  }

  input CreateCategoryInput {
    title: String!
    coverPhoto: String!
    content: String!
    author: ID
    categoryId: ID
    status: ArticleStatus!
  }

  input UpdateCategoryInput {
    id: ID
    name: String
  }

  type Category {
    id: ID!
    name: String!
    createdAt: Date
  }

  type Query {
    getCategories: [Category!]!
  }

  input CategoryInput {
    name: String!
  }

  type Mutation {
    createCategory(categoryInput: CreateCategoryInput!): Category!
    updateCategory(categoryInput: UpdateCategoryInput!): Category!
    deleteteCategory(categoryId: ID): Category
  }
`;
