import gql from 'graphql-tag';

export const QueryTypeDefs = gql`
  type Query {
    sampleQuery: String!
    _service: Service!
    getOrders: [Order]!
    getCategories: [Category]!
    getTableById(id: ID!): Table
    getAllTables: [Table]!
    getOrderById(id: ID!): Order
    getProducts: [Product]!
  }
`;
