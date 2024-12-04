import gql from 'graphql-tag';

export const typeDefs = gql`
  type BookingVenue {
    name: String!
    quantity: Int!
    price: Int!
  }

  type Booking {
    _id: ID!
    eventId: Event!
    bankName: String
    bankAccount: Int
    bankAccountName: String
    status: String
    userId: User!
    amountTotal: Int
    phone: String
    email: String
    selectedDate: String
    venues: [BookingVenue]
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
    venues: [CreateBookingVenueInput]
  }
  input CreateBookingVenueInput {
    name: String!
    quantity: Int!
    price: Int!
  }

  input UpdateBookingInput {
    _id: ID!
    status: String
  }

  input updateBookInput {
    _id: ID!
    bankName: String
    bankAccount: Int
    bankAccountName: String
    status: String
    amountTotal: Int
    phone: String
    email: String
    selectedDate: String
    venues: [CreateBookingVenueInput]
  }
  type Event {
    _id: ID!
    name: String!
    artistName: [String!]!
    description: String!
    eventDate: [String!]!
    eventTime: [String!]!
    images: [String!]!
    venues: [Venue!]!
    status: String
    discount: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  input BookingVenueInput {
    name: String!
    quantity: Int!
    price: Int!
  }
  input UpdateEventQuantityInput {
    _id: ID!
    venues: [BookingVenueInput!]!
    eventId: String!
  }

  type Query {
    getAllBooking: [Booking!]!
    getBookingByUserId(userId: ID!): [Booking!]!
    getBookingById(_id: ID!): Booking!
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking!
    createBookingTotalAmount(input: CreateBookingInput!): Booking!
    updateBooking(input: UpdateBookingInput!): Booking!
    updateBookingEverything(input: updateBookInput!): Booking!
    updateEventQuantityBooking(input: UpdateEventQuantityInput!): Booking!
  }
`;
