import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    ONE
    TWO
  }

  type Room {
    _id: ID!
    maxCapacity: Int!
    hotelId: HotelForRoom!
    name: String!
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
    roomAmenities: [AmenityForRoom!]!
    createdAt: Date!
    updatedAt: Date!
  }

  input RoomInput {
    name: String!
    maxCapacity: Int!
    hotelId: ID!
    roomNumber: String!
    price: Int!
    description: String!
    photos: [String!]
    roomType: RoomType!
    roomAmenities: [ID!]!
  }

  input UpdateRoomInput {
    _id: ID!
    maxCapacity: Int
    name: String
    roomNumber: String
    price: Int
    description: String
    photos: [String!]
    roomType: RoomType
    roomAmenities: [ID!]
  }

  input DateRangeInput {
    checkIn: Date!
    checkOut: Date!
  }

  type Query {
    getAllRooms: [Room!]!
    getRoomById(_id: ID!): [Room!]!
    getAvailableRooms(dateRange: DateRangeInput!, traveler: Int!): [Room!]!
  }

  type Mutation {
    createRoom(input: RoomInput!): Room!
    deleteRoom(_id: ID!): Room!
    updateRoom(input: UpdateRoomInput!): Room!
  }
`;
