import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getAllHotelsAmenities: [HotelAmenities!]!
    getHotelAmenityById(id: ID!): HotelAmenities!
  }

  type HotelAmenities {
    _id: ID!
    hotel_id: ID!
    Amenities: [ID!]!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateHotelAmenitiesInput {
    hotel_id: ID!
    amenities: [ID!]!
  }

  input UpdateHotelAmenitiesInput {
    hotel_id: ID!
    amenities: [ID!]!
  }

  type Mutation {
    createHotelAmenities(input: CreateHotelAmenitiesInput!): HotelAmenities!
    updateHotelAmenities(id: ID!, input: UpdateHotelAmenitiesInput!): HotelAmenities!
    deleteHotelAmenities(id: ID!): Response!
  }
`;
