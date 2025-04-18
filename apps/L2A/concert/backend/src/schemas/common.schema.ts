import gql from 'graphql-tag';

export const typeDefs = gql`
  enum TicketStatus {
    AVAILABLE
    RESERVED
    SOLD
  }

  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELLED
  }

  enum TicketType {
    VIP
    STANDART
    BACKSEAT
  }

  type otp {
    id: ID!
    user: User!
    otp: String!
  }

  type Venue {
    id: ID!
    name: String!
    address: String!
    city: String!
    capacity: Int!
  }

  type TicketCategory {
    type: TicketType!
    price: Int!
    capacity: Int!
  }

  type Concert {
    id: ID!
    title: String!
    description: String
    date: String!
    venue: Venue!
    tickets: [Ticket]!
    ticketCategories: [TicketCategory]!
    artistName: String!
    specialGuestName: String
  }

  type Ticket {
    id: ID!
    concert: Concert!
    seatNumber: String!
    price: Int
    type: TicketType!
    status: TicketStatus!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    isAdmin: Boolean!
    phone: Int
    bookings: [Booking]!
  }

  type Booking {
    id: ID!
    user: User!
    concert: Concert!
    tickets: [Ticket]!
    status: BookingStatus!
    totalAmount: Int!
    createdAt: String!
  }

  type Query {
    concerts: [Concert]!
    concert(id: ID!): Concert
    venues: [Venue!]!
    tickets(concertId: ID!): [Ticket]!
    user(id: ID!): User
    bookings(userId: ID!): [Booking]!
    sampleQuery: String!
  }

  input CreateBookingInput {
    userId: ID!
    concertId: ID!
    ticketIds: [ID]!
  }

  type Mutation {
    addUser(email: String!, password: String!): User!

    createConcert(title: String!, description: String, date: String!, venueId: ID!, artistName: String!, specialGuestName: String, ticketCategories: [TicketCategoryInput!]!): Concert!

    createVenue(name: String!, address: String!, city: String!, capacity: Int!): Venue!

    reserveTickets(concertId: ID!, ticketIds: [ID!]!): [Ticket!]!

    createBooking(input: CreateBookingInput!): Booking!

    cancelBooking(bookingId: ID!): Booking!

    registerUser(email: String!, firstName: String!, lastName: String!, password: String!): User!

    sampleMutation(text: String): String!
  }

  input TicketCategoryInput {
    type: TicketType!
    price: Int!
    capacity: Int!
  }
`;
