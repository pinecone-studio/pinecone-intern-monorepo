import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  input KeyValueInput {
    key: String!
    value: String!
  }

  type KeyValue {
    key: String!
    value: String!
  }

  input CreateHotelInput {
    name: String!
    phoneNumber: String!
    rating: Float
    starRating: Float
    description: String!
    images: [String!]!
    rooms: [ID]
    faqs: [KeyValueInput]
    policies: [KeyValueInput]
    about: [KeyValueInput]
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
    faqs: [KeyValue]
    policies: [KeyValue]
    about: [KeyValue]
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
