import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

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

  type Category {
    _id: ID!
    name: String!
  }

  input ProductUpdateInput {
    _id: ID!
    name: String
    price: Float
    description: String
    images: [String]
    category: ID
  }

  type Mutation {
    addProduct(name: String!, price: Float!, description: String!, images: [String!]!, category: ID!): Product
    updateProduct(input: ProductUpdateInput!): Product
    deleteProduct(id: ID!): Product
  }
  
  type Query {
  getAllProducts: [Product!]!
  getProductById(id: ID!): Product
  getProductsByCategory(categoryId: ID!): [Product!]!
  product(id: ID!): Product
  productsByCategory(categoryId: ID!): [Product!]!
}
`;
