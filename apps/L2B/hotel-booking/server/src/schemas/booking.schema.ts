import gql from 'graphql-tag';

export const BookingTypeDefs = gql`
  scalar Date

  type GuestInfo {
    adults: Int!
    children: Int!
  }

  enum BookingStatus {
    booked
    checked_in
    checked_out
    cancelled
  }

  type Booking {
    id: ID!
    userId: ID!
    hotelId: ID!
    roomId: ID!
    checkInDate: Date!
    checkOutDate: Date!
    guests: GuestInfo!
    roomNumber: String!
    totalPrice: Float!
    status: BookingStatus!
    images: [String]
    createdAt: Date
    updatedAt: Date
  }

  input GuestInput {
    adults: Int!
    children: Int!
  }

  input BookingInput {
    userId: ID!
    hotelId: ID!
    roomId: ID!
    checkInDate: Date!
    checkOutDate: Date!
    guests: GuestInput!
    roomNumber: String!
    totalPrice: Float!
    images: [String]
  }
  type Query {
    bookings: [Booking!]!
    booking(id: ID!): Booking
    upcomingBookings: [Booking!]!
    pastBookings(userId: ID!): [Booking!]!
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking!
    updateBookingStatus(id: ID!, status: BookingStatus!): Booking!
  }
`;
