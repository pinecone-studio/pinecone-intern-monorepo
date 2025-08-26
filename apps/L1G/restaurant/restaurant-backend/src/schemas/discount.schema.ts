import { gql } from 'apollo-server-cloud-functions';

export const discountTypeDefs = gql`
  type Discount {
    discountId: ID!
    discountName: String!
    discountRate: Int!
    startDate: String!
    endDate: String!
    createdAt: String
    updatedAt: String
  }

  input CreateDiscountInput {
    discountName: String!
    discountRate: Int!
    startDate: String!
    endDate: String!
  }

  input UpdateDiscountInput {
    discountName: String!
    discountRate: Int!
    startDate: String!
    endDate: String!
  }

  type Query {
    getDiscounts: [Discount]!
  }

  type Mutation {
    createDiscount(input: CreateDiscountInput!): Discount!
    updateDiscount(discountId: ID!, input: UpdateDiscountInput!): Discount!
    deleteDiscount(discountId: ID!): Discount!
  }
`;
