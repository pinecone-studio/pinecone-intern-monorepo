import gql from 'graphql-tag';

export const typeDefs = gql`
  type Review {
    _id: ID!
    user: User!
    product: Product!
    rating: Int!
    comment: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getReviews: [Review!]!
  }

  type Mutation {
    createReview(Review: [ReviewInput!]!): Response!
  }

  input ReviewInput {
    productId: ID!
    rating: Int!
    comment: String!
  }
`;
