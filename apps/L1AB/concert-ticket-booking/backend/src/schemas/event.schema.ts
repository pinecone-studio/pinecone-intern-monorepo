import gql from 'graphql-tag';

export const typeDefs = gql`
  type Venue {
    name: String!
    quantity: Int!
    firstquantity: Int!
    price: Int!
  }

  type Event {
    _id: ID!
    name: String!
    artistName: [String!]!
    description: String!
    location: String
    eventDate: [String!]!
    eventTime: [String!]!
    images: [String!]!
    venues: [Venue!]!
    status: String
    discount: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  input updateEventStatus {
    _id: ID!
    status: String
  }

  input UpdateEventInput {
    eventId: ID!
    name: String
    artistName: [String]
    description: String
    location: String
    eventDate: [String]
    eventTime: [String]
    images: [String]
    venues: [VenueInput]
    discount: Int
    status: String
  }

  input EventInput {
    name: String!
    artistName: [String!]!
    description: String!
    location: String
    eventDate: [String!]!
    eventTime: [String!]!
    images: [String!]!
    venues: [VenueInput!]!
    discount: Int
    status: String
  }

  input VenueInput {
    name: String!
    firstquantity: Int!
    quantity: Int!
    price: Int!
  }

  type Query {
    getAllEvents: [Event!]!
    getEventById(_id: ID!): Event!
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(input: UpdateEventInput!): Event!
    updateEventStatus(input: updateEventStatus!): Event!
    deleteEvent(_id: ID!): Event!
  }
`;
