import { gql } from 'graphql-tag';
 
export const tableTypeDefs = gql`
  type Table {
    id: ID!
    name: String!
    qrCodeUrl: String!
  }
 
  type Query {
    getTable(id: ID!): Table!
    getTables: [Table!]!
  }
 
  type Mutation {
    addTable(name: String!, qrCodeUrl: String!): Table!
    updateTable(id: ID!, name: String, qrCodeUrl: String): Table!
    deleteTable(id: ID!): Boolean!
  }
`;