import gql from "graphql-tag";

export const ConcertTypeDefs = gql`
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
`