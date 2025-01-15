import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

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

  type CreateRoomResponse {
    code: Int!
    success: Boolean!
    message: String!
    room: Room
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): CreateRoomResponse!
  }

  type Query {
    getRooms: [Room!]!
  }
`;
