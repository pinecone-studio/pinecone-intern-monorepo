import gql from 'graphql-tag';

export const MutationTypeDefs = gql`
  type Mutation {
    addUser(email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    createConcert(title: String!, description: String, venueId: ID!, artistName: String!, specialGuestName: String, ticketCategories: [TicketCategoryInput!]): Concert!
    createVenue(name: String!, address: String!, city: String!, capacity: Int!): Venue!
    createTicket(concert: String!, seatNumber: String!, price: Int, type: String!, Status: String): Ticket!
    reserveTickets(concertId: ID!, ticketIds: [ID!]!): [Ticket!]!
    createBooking(input: CreateBookingInput!, ticketIds: [String!]!): Booking!
    cancelBooking(bookingId: ID!): Booking!
    registerUser(email: String!, password: String!): User!
    sampleMutation(text: String): String!
  }
`;
