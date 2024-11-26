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
    getAllRooms: [Room!]
    getRoomById(_id: ID!): [Room!]!
  }

  type Mutation {
    createRoom(input: RoomInput): Room!
    deleteRoom(_id: ID!): Room!
    updateRoom(input: UpdateRoomInput!): Room!
  }
`;
