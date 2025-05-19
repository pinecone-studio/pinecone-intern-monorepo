import gql from 'graphql-tag';

export const BookingTypeDefs = gql`
  type GuestInfo {
    adults: Int!
    children: Int!
  }

  type Booking {
    id: ID!
    userId: ID!
    hotelId: ID!
    roomId: ID!
    checkInDate: Date!
    checkOutDate: Date!
    guests: GuestInfo!
    totalPrice: Float!
    status: BookingStatus!
    images: [String!]!
    createdAt: Date
    updatedAt: Date
  }

  enum BookingStatus {
    BOOKED
    CHECKED_IN
    CHECKED_OUT
    CANCELLED
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
    images: [String!]!
  }

  type Query {
    bookings: [Booking!]!
    booking(id: ID!): Booking
    upcomingBookings: [Booking!]!
    pastBookings(userId: ID!): [Booking!]!
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking!
    cancelBooking(id: ID!): Booking!
    checkIn(id: ID!): Booking!
    checkOut(id: ID!): Booking!
  }
`;
