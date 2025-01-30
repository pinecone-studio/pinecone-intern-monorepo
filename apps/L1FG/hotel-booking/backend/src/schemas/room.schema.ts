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
  input editRoomGeneralInfoInput {
    id: ID!
    name: String
    price: Float
    roomInfo: [String]
    type: String
  }

  type CreateRoomResponse {
    code: Int!
    success: Boolean!
    message: String!
    room: Room
  }
  input editRoomServicesInput {
    id: ID!
    roomServices: [KeyValueInput]
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): CreateRoomResponse!
    editRoomGeneralInfo(input: editRoomGeneralInfoInput!): Room
    editRoomServices(input: editRoomServicesInput!): Room
  }

  type Query {
    getRooms: [Room!]!
    getRoomsByHotelId(hotelId: ID!): [Room]
  }
`;
