import gql from 'graphql-tag';

export const categoryTypeDefs = gql`
  scalar JSON
  scalar Date

  enum Response {
    Success
  }

  input CategoryInputType {
    categoryName: String!
  }

  type CategoryType {
    id: ID!
    categoryName: String!
    createdAt: Date!
  }

  type Query {
    sampleQuery: String!
    getCategories: [CategoryType!]!
  }

  type Mutation {
    sampleMutation: String!
    createCategory(input: CategoryInputType!): CategoryType!
  }
`;
