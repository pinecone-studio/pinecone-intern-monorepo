import gql from 'graphql-tag';

export const typeDefs = gql`
  input CreateBookingInput {
    userId: ID!
    concertId: ID!
  }

  input CreateTicketInput {
    concert: ID!
    date: String!
    seatType: String!
    price: Int!
    status: TicketStatus
    userId: ID
  }

  input CreateConcertInput {
    title: String!
    description: String
    thumbnailUrl: String
    doorOpen: String!
    musicStart: String!
    venue: ID!
    artistName: String!
    specialGuestName: String
    seatData: [SeatDataInput!]!
    endDate: String!
  }

  input SeatInfoInput {
    price: Int!
    availableTickets: Int!
  }

  input SeatCategoriesInput {
    VIP: SeatInfoInput!
    Standard: SeatInfoInput!
    Backseat: SeatInfoInput!
  }

  input SeatDataInput {
    date: String!
    seats: SeatCategoriesInput!
  }
`;
