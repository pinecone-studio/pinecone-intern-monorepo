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
    _id: ID!
    userId: User!
    hotelId: Hotel!
    roomId: Room!
    checkInDate: Date!
    checkOutDate: Date!
    guests: GuestInfo!
    totalPrice: Float!
    status: BookingStatus!
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
    totalPrice: Float!
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
