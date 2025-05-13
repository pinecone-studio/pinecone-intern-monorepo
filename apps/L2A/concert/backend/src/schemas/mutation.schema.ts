import gql from 'graphql-tag';

export const MutationTypeDefs = gql`
  type Mutation {
    addUser(email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    createConcert(input: CreateConcertInput!): Concert!
    createVenue(name: String!, address: String!, city: String!, capacity: Int!): Venue!
    createTicket(concert: String!, seatNumber: String!, price: Int, type: String!, Status: String): Ticket!
    reserveTickets(concertId: ID!, ticketIds: [ID!]!): [Ticket!]!
    createBooking(input: CreateBookingInput!, ticketIds: [String!]!): Booking!
    cancelBooking(bookingId: ID!): Booking!
    registerUser(email: String!, password: String!): User!
    sampleMutation(text: String): String!
    updateUserInfo(id: String!, email: String, password: String, phone: Int): User!
    OTP(email: String!): String!
    changePassword(otp: String!, newPassword: String!): String!
  }
`;
