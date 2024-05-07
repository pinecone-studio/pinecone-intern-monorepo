import gql from "graphql-tag";

export const dependentSchema = gql`
scalar Date
type Dependent {
    id: ID!
    firstName: String
    lastName: String
    phone: String
    dependency: String
  }

  input CreateDependetInput {
    firstName: String
    lastName: String
    phone: String
    dependency: String
  }

  input UpdateDependentInput {
    firstName: String
    lastName: String
    phone: String
    dependency: String
  }

  type Query {
    getDependent(id: ID!): Dependent!
    getAllDependents: [Dependent!]
  }

  type Mutation {
    createDependent(input: CreateDependetInput): Dependent!
    deletedDependent(id: ID!): Dependent!
    updatedDependent(id: ID!, input: UpdateDependentInput!): Dependent!

  }
`