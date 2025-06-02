import gql from 'graphql-tag';

export const EnumTypeDefs = gql`
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

  enum RequestStatus {
    APPROVED
    PENDING
  }
`;
