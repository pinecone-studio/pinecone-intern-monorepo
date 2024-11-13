import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    ONE
    TWO
  }

  type Room {
    _id: ID!
    hotelId: Hotel!
    name: String!
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
    createdAt: Date!
    updatedAt: Date!
  }

  input RoomInput {
    name: String!
    hotelId: ID!
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
  }

  input UpdateRoomInput {
    _id: ID!
    name: String
    roomNumber: String
    price: Int
    description: String
    photos: [String!]
    roomType: RoomType
  }

  type Query {
    getRooms: [Room!]
    getRoomById(_id: ID!): Room!
  }

  type Mutation {
    addRoom(input: RoomInput): Room!
    deleteRoom(_id:ID!): Room!
    updateRoom(input: UpdateRoomInput!): Room!
  }

`;
