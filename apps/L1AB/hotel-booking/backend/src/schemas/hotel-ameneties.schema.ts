import gql from 'graphql-tag';

export const typeDefs = gql`
  type HotelAmenities {
    _id: ID!
    hotelId: Hotel!
    amenities: [Amenity!]!
  }

  input CreateHotelAmenitiesInput {
    hotelId: ID!
    amenities: [ID!]!
  }

  input UpdateHotelAmenitiesInput {
    _id: ID!
    amenities: [ID!]
  }

  type Query {
    getAllHotelAmenities: [HotelAmenities!]!
    getHotelAmenityById(_id: ID!): [HotelAmenities!]!
    getHotelIdByHotelAmenities(_id: ID!): HotelAmenities!
  }

  type Mutation {
    createHotelAmenities(input: CreateHotelAmenitiesInput): HotelAmenities!
    updateHotelAmenities(input: UpdateHotelAmenitiesInput!): HotelAmenities!
    deleteHotelAmenities(_id: ID!): Response!
  }
`;
