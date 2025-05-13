import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Int!
    status: Boolean!
    images: [String!]!
    category: Category!
    createdAt: Date!
    updatedAt: Date!
  }

  input AddProductInput {
    name: String!
    price: Float!
    status: Boolean!
    images: [String!]!
    category: ID!
  }

  input UpdateProductInput {
    _id: ID!
    name: String
    price: Float
    status: Boolean
    images: [String]
    category: ID
  }

  input DeleteProductInput {
    _id: ID!
  }
`;
