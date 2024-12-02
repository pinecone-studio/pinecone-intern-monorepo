import gql from 'graphql-tag';

export const typeDefs = gql`
  enum StatusType {
    canceled
    booked
    completed
  }

  enum UpdateStatusType {
    canceled
    completed
  }

  type Booking {
    _id: ID!
    roomId: Room!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    status: StatusType!
    checkIn: Date!
    checkOut: Date!
    traveller: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateBookingInput {
    roomId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    checkIn: Date!
    checkOut: Date!
    traveller: Int!
  }

  input UpdateBookingInput {
    status: UpdateStatusType!
  }

  type Query {
    getAllBookings: [Booking!]!
    getBookingById(_id: ID!): [Booking!]!
  }

  type Mutation {
    createBooking(input: CreateBookingInput): Response!
    updateBooking(input: UpdateBookingInput!): Response!
  }
`;