
import { gql } from 'apollo-server-cloud-functions';

export const menuCategoryTypeDefs = gql`
  type Category {
    categoryId: ID!
    categoryName: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCategoryById(categoryId: ID!): Category!
    getCategories: [Category!]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(categoryId: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(categoryId: ID!): Category!
  }


  input CreateCategoryInput {
    categoryName: String!
  }

  input UpdateCategoryInput {
    categoryName: String!
  }
`;
