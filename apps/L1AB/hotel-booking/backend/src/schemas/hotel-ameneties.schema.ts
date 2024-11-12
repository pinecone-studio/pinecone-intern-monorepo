import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Query {
    getAllHotelsAmenities: [HotelAmenities!]!
    getHotelAmenityById(id: ID!): HotelAmenities!
  }

  type HotelAmenities {
    _id: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  type Mutation {
    deleteHotelAmenities(id: ID!): Response!
  }
`;
