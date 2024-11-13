import gql from 'graphql-tag';

export const typeDefs = gql`
  type Amenity {
    _id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateAmenityInput {
    name: String!
  }

  input UpdateAmenityInput {
    _id: ID!
    name: String!
  }

  type Query {
    getAllAmenities: [Amenity!]!
    getAmenityById(_id: ID!): Amenity!
  }

  type Mutation {
    createAmenity(input: CreateAmenityInput!): Amenity!
    UpdateAmenity(input: UpdateAmenityInput!): Amenity!
    deleteAmenity(_id: ID!): Response!
  }
`;
