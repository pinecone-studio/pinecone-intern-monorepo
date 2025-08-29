import { gql } from 'apollo-server-cloud-functions';

export const eventTypeDefs = gql`
  type Event {
    _id: ID!
    title: String!
    description: String
    date: String!
    location: String!
    createdBy: User!
    tickets: [Ticket!]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getEvent(_id: ID!): Event!
    getEvents: [Event!]!
  }

  type Mutation {
    createEvent(title: String!, description: String, date: String!, location: String!): Event!
    updateEvent(_id: ID!, title: String, description: String, date: String, location: String): Event!
    deleteEvent(_id: ID!): Event!
  }
`;
