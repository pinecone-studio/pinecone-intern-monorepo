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
    bathroom: [String]
    accessibility: [String]
    internet: [String]
    foodAndDrink: [String]
    bedroom: [String]
    other: [String]
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
    bathroom: [String]
    accessibility: [String]
    internet: [String]
    foodAndDrink: [String]
    bedroom: [String]
    other: [String]
    tax: Float
  }
  input editRoomGeneralInfoInput {
    id: ID!
    name: String
    price: Float
    roomInfo: [String]
    type: String
    bed: Int
    roomNumber: Int
    tax: Float
  }

  type CreateRoomResponse {
    code: Int!
    success: Boolean!
    message: String!
    room: Room
  }
  input editRoomServicesInput {
    id: ID!
    bathroom: [String]
    accessibility: [String]
    internet: [String]
    foodAndDrink: [String]
    bedroom: [String]
    other: [String]
  }

  input editRoomImagesInput {
    id: ID!
    images: [String]
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): CreateRoomResponse!
    editRoomGeneralInfo(input: editRoomGeneralInfoInput!): Room
    editRoomServices(input: editRoomServicesInput!): Room
    editRoomImages(input: editRoomImagesInput!): Room
  }

  type Query {
    getRooms: [Room!]!
    getRoomById(id: ID!): Room
    getRoomsByHotelId(hotelId: ID!): [Room]
  }
`;
