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
    roomServices: [KeyValue]
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
    roomServices: [KeyValueInput]
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
