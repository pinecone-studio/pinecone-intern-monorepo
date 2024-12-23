import gql from 'graphql-tag';

export const typeDefs = gql`
  type Amenity {
    _id: ID!
    name: String!
    icon: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type AmenityForRoom {
    _id: ID!
    name: String
    icon: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateAmenityInput {
    name: String!
    icon: String!
  }

  input UpdateAmenityInput {
    _id: ID!
    name: String!
    icon: String!
  }

  type Query {
    getAllAmenities: [Amenity!]!
    getAmenityById(_id: ID!): Amenity!
  }

  type Mutation {
    createAmenity(input: CreateAmenityInput!): Amenity!
    updateAmenity(input: UpdateAmenityInput!): Amenity!
    deleteAmenity(_id: ID!): Response!
  }
`;
