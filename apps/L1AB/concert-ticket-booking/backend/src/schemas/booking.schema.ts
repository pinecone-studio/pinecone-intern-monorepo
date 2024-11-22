import gql from 'graphql-tag';

export const typeDefs = gql`
  type Venue {
    name: String
    quantity: Int
    price: Int
  }

  type Booking {
    _id: ID!
    eventId: Event!
    bankName: String
    bankAccount: Int
    status: String!
    userId: User!
    amountTotal: Int
    phone: String
    email: String
    selectedDate: String
    venues: [Venue]
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateBookingInput {
    eventId: ID!
    bankName: String
    bankAccount: Int
    status: String
    userId: ID!
    amountTotal: Int
    phone: String
    email: String
    selectedDate: String
    venues: [VenueInput]
  }

  input VenueInput {
    name: String
    quantity: Int
    price: Int
  }

  input UpdateBookingInput {
    _id: ID!
    status: String
  }

  type Query {
    getAllBooking: [Booking!]!
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking!
    updateBooking(input: UpdateBookingInput!): Booking!
  }
`;
