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
  input CreateRoomInput {
    hotelId: ID!
    name: String
    roomNumber: Int
    price: Float
    bed: Int
    images: [String!]!
    roomInfo: [String]
    type: String
    roomServices: [String]
    tax: Float
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
  type Room {
    id: ID!
    name: String
    hotelId: ID!
    roomNumber: Int
    price: Float
    bed: Int
    images: [String!]!
    roomInfo: [String]
    type: String
    roomServices: [String]
    tax: Float
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

  type CreateRoomResponse {
    code: Int!
    success: Boolean!
    message: String!
    room: Room
  }

  type Mutation {
    createHotel(input: CreateHotelInput!): CreateHotelResponse!
    createRoom(input: CreateRoomInput!): CreateRoomResponse!
  }
  type Query {
    getHotels: [Hotel!]!
    getHotelById(id: ID!): Hotel
  }
`;
