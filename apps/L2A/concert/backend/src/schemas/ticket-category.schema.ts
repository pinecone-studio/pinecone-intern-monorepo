import gql from "graphql-tag";

export const TicketCategoryTypeDefs = gql`
  type TicketCategory {
    type: TicketType!
    price: Int!
    capacity: Int!
  }
`;