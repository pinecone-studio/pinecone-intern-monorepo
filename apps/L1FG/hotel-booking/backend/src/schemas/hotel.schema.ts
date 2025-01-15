import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  input CreateHotelInput {
    name: String!
    phoneNumber: String!
    rating: Float
    starRating: Float
    description: String!
    images: [String!]!
    rooms: [ID]
    faqs: [String]
    policies: [String]
    about: [String]
    location: LocationInput!
    locationName: String
  }

  input LocationInput {
    type: String!
    coordinates: [Float!]!
  }

  type Hotel {
    id: ID!
    name: String!
    phoneNumber: String!
    rating: Float
    starRating: Float
    description: String!
    images: [String!]!
    rooms: [ID]
    faqs: [String]
    policies: [String]
    about: [String]
    location: Location
    locationName: String
  }

  type Location {
    type: String!
    coordinates: [Float!]!
  }

  type CreateHotelResponse {
    code: Int!
    success: Boolean!
    message: String!
    hotel: Hotel
  }

  type Mutation {
    createHotel(input: CreateHotelInput!): CreateHotelResponse!
  }
  type Query {
    getHotels: [Hotel!]!
    getHotelById(id: ID!): Hotel
  }
`;
