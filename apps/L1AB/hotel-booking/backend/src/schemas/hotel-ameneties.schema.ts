import gql from 'graphql-tag';

export const typeDefs = gql`
  type HotelAmenities {
    _id: ID!
    hotel_id: Hotel!
    amenities: [Amenity!]!
  }

  input CreateHotelAmenitiesInput {
    hotel_id: ID!
    amenities: [ID!]!
  }

  input UpdateHotelAmenitiesInput {
    amenities: [ID!]
  }

  type Query {
    getAllHotelsAmenities: [HotelAmenities!]!
    getHotelAmenityById(id: ID!): HotelAmenities!
  }

  type Mutation {
    createHotelAmenities(input: CreateHotelAmenitiesInput): HotelAmenities!
    updateHotelAmenities(id: ID!, input: UpdateHotelAmenitiesInput): HotelAmenities!
    deleteHotelAmenities(id: ID!): Response!
  }
`;
