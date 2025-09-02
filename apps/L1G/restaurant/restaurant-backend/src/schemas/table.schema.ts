import { gql } from 'apollo-server-cloud-functions';

export const tableTypeDefs = gql`
  type Table {
    tableId: ID!
    tableName: String!
    tableQr: String!
  }

  input CreateTableInput {
    tableName: String!
  }

  input UpdateTableInput {
    tableName: String!
    tableQR: String!
  }

  input DeleteTableInput {
    tableId: ID!
  }

  type Query {
    getTables: [Table!]!
    getTableByName(tableName: String!): Table!
  }

  type Mutation {
    createTable(input: CreateTableInput!): Table!
    updateTable(tableId: ID!, input: UpdateTableInput!): Table!
    deleteTable(tableId: ID!): Table!
  }
`;
