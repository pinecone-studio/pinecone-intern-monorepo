import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    ONE
    TWO
  }

  type Room {
    id: ID!
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
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
  }

  input UpdateRoomInput {
    id: ID!
    name: String!
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
  }

  type Query {
    getRooms: [Room!]
    getRoomById(id: ID!): Room!
  }

  type Mutation {
    addRoom(input: RoomInput): Room!
    deleteRoom(id: ID!): Room!
    updateRoom(input: UpdateRoomInput): Room!
  }
`;
