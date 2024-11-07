import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Int!
    description: String!
    images: [String!]!
    category: Category!
    createdAt: Date!
    updatedAt: Date!
  }

  type SearchProduct {
    _id: ID!
    name: String!
    price: Int!
    images: [String!]!
  }

  input QueryOptions {
    filter: JSON
  }

  type Query {
    getProducts(options: QueryOptions): [Product!]!
    getProductById(_id: ID!): Product!
    getProductsBySearch(searchValue: String!): [SearchProduct!]!
  }
`;
