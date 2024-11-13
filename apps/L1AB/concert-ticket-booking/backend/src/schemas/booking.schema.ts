import gql from 'graphql-tag';

export const typeDefs = gql`
  type Booking {
    _id: ID!
    userId: User!
    eventId: Event!
    phone: String!
    email: String!
  }
`;
