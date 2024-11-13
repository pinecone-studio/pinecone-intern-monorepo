import gql from 'graphql-tag';

export const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    artistName: [String!]!
    description: String!
    eventDate: [String!]!
    eventTime: [String!]!
    images: [String!]!
    venues: [Venue!]!
    discount: Int!
  }

  input UpdateEventInput {
    eventId: ID!
    name: String
    artistName: [String]
    description: String
    eventDate: [String]
    eventTime: [String]
    images: [String]
    discount: Int
  }

  type Query {
    getAllEvents: [Event!]!
    getEventById(_id: ID!): Event!
  }

  type Mutation {
    updateEvent(input: UpdateEventInput!): Event!
  }
`;
