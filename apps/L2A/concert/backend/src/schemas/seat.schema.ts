import gql from 'graphql-tag';

export const SeatDataTypeDefs = gql`
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
