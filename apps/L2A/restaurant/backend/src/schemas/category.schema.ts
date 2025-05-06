import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    getCategories: [Category!]!
  }

  input AddCategoryInput {
    name: String!
  }
  input UpdateCategoryInput {
    _id: ID!
    name: String!
  }
  input DeleteCategoryInput {
    _id: ID!
  }

  extend type Mutation {
    addCategory(input: AddCategoryInput): Category!
    updateCategory(input: UpdateCategoryInput): Category!
    deleteCategory(input: DeleteCategoryInput): Category!
  }
`;
