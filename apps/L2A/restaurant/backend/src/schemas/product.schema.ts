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

  input AddProductInput {
    name: String!
    price: Float!
    description: String!
    images: [String!]!
    category: ID!
  }

  input UpdateProductInput {
    _id: ID!
    name: String
    price: Float
    description: String
    images: [String]
    category: ID
  }

  input DeleteProductInput {
    _id: ID!
  }
  extend type Mutation {
    addProduct(input: AddProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(input: DeleteProductInput!): Product
  }
  
  type Query {
  getAllProducts: [Product!]!
  getProductById(id: ID!): Product
  getProductsByCategory(categoryId: ID!): [Product!]!
  product(id: ID!): Product
  productsByCategory(categoryId: ID!): [Product!]!
}

