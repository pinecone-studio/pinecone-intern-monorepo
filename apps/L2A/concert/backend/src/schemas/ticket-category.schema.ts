import gql from 'graphql-tag';

export const TicketCategoryTypeDefs = gql`
  type TicketCategory {
    id: String!
    StartTime: String!
    EndTime: String!
    seats: [Seat]!
    pricePerSeat: [PricePerSeat]!
  }

  type Seat {
    date: String!
    VIP: Int!
    Standard: Int!
    Backseat: Int!
  }

  type PricePerSeat {
    date: String!
    VIP: Int!
    Standard: Int!
    Backseat: Int!
  }
`;
