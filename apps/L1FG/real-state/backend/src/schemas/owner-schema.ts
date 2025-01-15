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
  status: Status!
  updatedAt: String!
  createdAt: String!
}

enum Status {
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
  status: Status!
}

type Query {
  getOwner(_id: ID!): Owner!
  getOwners: [Owner!]!
}

type Mutation {
  createOwner(input: OwnerInput!): Owner!
  updateOwner(_id: ID!, input: OwnerInput!): Owner!
  deleteOwner(_id: ID!): Owner!
}
`;
