import gql from 'graphql-tag';

export const QueryTypeDefs = gql`
  type Query {
    concerts: [Concert]!
    concert(concertId: String!): Concert!
    venues: [Venue]!
    tickets: [Ticket]!
    user(id: ID!): User
    bookings(userId: ID!): [Booking]!
    sampleQuery: String!
    GetUserInfo(JWT: String!): User
    requests: [Request]!
    deleteTestDocs: Boolean!
    userTickets(userId: String!): [Ticket!]!
    featuredEvents: [Concert!]!
  }
`;
