import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type Booking {
    id: ID!
    userId: ID!
    hotelId: ID!
    roomId: ID!
    startDate: Date!
    endDate: Date!
    phoneNumber: String!
    guestRequest: String
    email: String!
    status: String!
    cardName: String!
    cardNumber: String!
    expirationDate: Date!
    securityCode: Int!
    country: String!
  }
  input CreateBookingInput {
    userId: ID!
    hotelId: ID!
    roomId: ID!
    startDate: Date!
    endDate: Date!
    phoneNumber: String!
    guestRequest: String
    email: String!
    status: String!
    cardName: String!
    cardNumber: String!
    expirationDate: Date!
    securityCode: Int!
    country: String!
  }

  type CreateBookingResponse {
    code: Int!
    success: Boolean!
    message: String!
    booking: Booking
  }

  input EditBookingStatusInput {
    id: ID!
    status: String!
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): CreateBookingResponse!
    editBookingStatus(input: EditBookingStatusInput!): Booking
  }

  type Query {
    getBookingById(id: ID!): Booking
    getBookings: [Booking]
    getBookingsByRoomId(roomId: ID!): [Booking]
    getBookingsByUserId(userId: ID!): [Booking]
    getBookingsByHotelId(hotelId: ID!): [Booking]
  }
`;
