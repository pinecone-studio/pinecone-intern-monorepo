import gql from 'graphql-tag';

export const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    artistName: [String!]!
    description: String!
    eventDate: Date!
    eventTime: Date!
    images: [String!]!
    venues: [Venue!]!
    discount: Int!
  }
  type Query {
    getAllEvents: [Event!]!
  }
`;
