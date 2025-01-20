import gql from 'graphql-tag';

export const OwnerTypeDefs = gql`
  scalar JSON

  type Owner {
    _id: ID!
    propertyOwnerId: ID!
    title: String!
    description: String!
    price: Int!
    propertyDetail: ID!
    status: OwnerStats!
    updatedAt: String!
    createdAt: String!
  }

  enum OwnerStats {
    PENDING
    APPROVED
    DECLINED
  }

  input OwnerInput {
    propertyOwnerId: ID!
    title: String!
    description: String!
    price: Int!
    propertyDetail: ID!
    status: OwnerStats!
    updatedAt: String!
    createdAt: String!
  }

  input OwnerUpdateInput {
    propertyOwnerId: ID
    title: String
    description: String
    price: Int
    propertyDetail: ID
    status: OwnerStats
    updatedAt: String
    createdAt: String
  }

  type Query {
    getOwnerById(_id: ID!): Owner
    getOwners(input: String): [Owner]
  }

  type Mutation {
    createOwner(input: OwnerInput!): Owner!
    updateOwner(_id: ID!, input: OwnerUpdateInput!): Owner!
    deleteOwner(_id: ID!): Owner!
  }
`;
