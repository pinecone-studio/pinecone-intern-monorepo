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
    _id: ID
    title: String!
    propertyOwnerId: ID
    price: Int
    propertyDetail: ID
    description: String!
    status: OwnerStats!
    updatedAt: String
    createdAt: String
  }

  input OwnerUpdateInput {
    _id: ID
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
    getOwners(input: JSON): [Owner]
    getPostsByUserId(input: ID): [Owner]
  }

  type Mutation {
    addOwner(input: OwnerInput!): Owner!
    updatedOwner(_id: ID!, input: OwnerUpdateInput!): Owner!
    deleteOwner(_id: ID!): Owner!
  }
`;
