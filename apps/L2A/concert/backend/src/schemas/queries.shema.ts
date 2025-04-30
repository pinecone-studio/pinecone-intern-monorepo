import gql from 'graphql-tag';

export const QueryTypeDefs = gql`
  type Query {
    concerts: [Concert]!
    concert(concertId: String!): Concert!
    venues: [Venue!]!
    tickets(concertId: ID!): [Ticket]!
    user(id: ID!): User
    bookings(userId: ID!): [Booking]!
    sampleQuery: String!
  }
`;
