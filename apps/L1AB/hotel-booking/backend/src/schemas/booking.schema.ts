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
    userId: User!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    status: StatusType!
    checkIn: Date!
    checkOut: Date!
    traveler: Int!
    isPaid: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateBookingInput {
    roomId: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    isPaid: Boolean!
    checkIn: Date!
    checkOut: Date!
    traveler: Int!
  }

  input UpdateBookingInput {
    _id: ID!
    status: UpdateStatusType!
  }

  type Query {
    getAllBookings: [Booking!]!
    getBookingById(_id: ID!): [Booking!]!
    getBookingByUserId(_id: ID!): [Booking!]!
  }

  type Mutation {
    createBooking(input: CreateBookingInput): Response!
    updateBooking(input: UpdateBookingInput!): Response!
  }
`;
