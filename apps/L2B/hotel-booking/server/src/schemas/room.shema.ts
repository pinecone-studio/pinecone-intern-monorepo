import gql from 'graphql-tag';

export const RoomTypeDefs = gql`
  type Room {
    id: ID!
    hotelId: ID!
    name: String!
    type: RoomType!
    pricePerNight: Float!
    information: String!
    services: RoomServices!
    images: [String!]!
    roomNumber: Int!
    isAvailable: Boolean!
    createdAt: String
    updatedAt: String
  }

  type RoomServices {
    bathroom: [String!]!
    accessibility: [String!]!
    entertainment: [String!]!
    foodAndDrink: [String!]!
    starsRating: Int
    other: [String!]!
    internet: [String!]!
    bedroom: [String!]!
  }

  enum RoomType {
    single
    double
    twin
    suite
    deluxe
    family
  }

  input RoomInput {
    hotelId: ID!
    name: String!
    type: RoomType!
    pricePerNight: Float!
    information: String!
    services: RoomServicesInput!
    images: [String!]!
    roomNumber: Int!
    isAvailable: Boolean
  }

  input RoomUpdateInput {
    hotelId: ID
    name: String
    type: RoomType
    pricePerNight: Float
    information: String
    services: RoomServicesInput
    images: [String]
    roomNumber: Int!
    isAvailable: Boolean
  }

  input RoomServicesInput {
    bathroom: [String!]!
    accessibility: [String!]!
    entertainment: [String!]!
    foodAndDrink: [String!]!
    starsRating: Int
    other: [String!]!
    internet: [String!]!
    bedroom: [String!]!
  }

  type Query {
    rooms: [Room!]!
    room(id: ID!): Room
    roomsByHotel(hotelId: ID!): [Room!]!
  }

  type Mutation {
    createRoom(input: RoomInput!): Room!
    updateRoom(id: ID!, input: RoomUpdateInput): Room!
    deleteRoom(id: ID!): SuccessResponse!
  }

  type SuccessResponse {
    success: Boolean!
    message: String!
  }

  scalar Date
`;
