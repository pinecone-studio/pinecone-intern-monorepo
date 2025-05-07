import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Table {
    _id: ID!
    name: String!
    qrCodeUrl: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input AddTableInput {
    name: String!
  }

  input UpdateTableInput {
    _id: ID!
    name: String!
  }

  input DeleteTableInput {
    _id: ID!
  }

  extend type Mutation {
    addTable(input: AddTableInput!): Table
    updateTable(input: UpdateTableInput!): Table
    deleteTable(input: DeleteTableInput!): Table
  }
`;
