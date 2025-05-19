import gql from 'graphql-tag';

export const RoomTypeDefs = gql`
  type Room {
    id: ID!
    hotelId: ID!
    title: String!
    description: String
    price: Float!
    images: [String!]!
    createdAt: Date
    updatedAt: Date
  }

  input RoomInput {
    hotelId: ID!
    title: String!
    description: String
    price: Float!
    images: [String!]!
  }

  type Query {
    rooms: [Room!]!
    room(id: ID!): Room
  }

  type Mutation {
    createRoom(input: RoomInput!): Room!
    updateRoom(id: ID!, input: RoomInput!): Room!
    deleteRoom(id: ID!): SuccessResponse!
  }
`;
