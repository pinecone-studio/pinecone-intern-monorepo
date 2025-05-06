import gql from 'graphql-tag';

export const ConcertTypeDefs = gql`
  type Concert {
    id: ID!
    title: String!
    description: String
    thumbnailUrl: String
    doorOpen: String!
    musicStart: String!
    venue: Venue!
    artistName: String!
    specialGuestName: String
    seatData: [SeatData!]!
    endDate: String!
  }

  type SeatData {
    date: String!
    seats: SeatCategories!
  }

  type SeatCategories {
    VIP: SeatInfo!
    Standard: SeatInfo!
    Backseat: SeatInfo!
  }

  type SeatInfo {
    price: Int!
    availableTickets: Int!
  }
`;
