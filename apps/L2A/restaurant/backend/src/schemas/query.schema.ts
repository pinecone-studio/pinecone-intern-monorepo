import gql from 'graphql-tag';

export const QueryTypeDefs = gql`
  type Query {
    sampleQuery: String!
    _service: Service!
    getCategories: [Category]!
    getCategoryById(id: ID!): Category
    getTableById(id: ID!): Table
    getAllTables: [Table]!
    getOrderById(id: ID!): Order
    getOrders: [Order]!
    getProducts: [Product]!
    getProductById(id: ID!): Product
  }
`;
