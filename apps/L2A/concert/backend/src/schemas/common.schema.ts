import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    username: String!
    phone: Int!
    isAdmin: Boolean
    updatedAt: String!
    createdAt: String!
  }

  type Event {
    _id: ID!
    title: String
    description: String!
    price: Int!
    artist: String!
    location: String!
    capacity: String!
    doorOpen: String!
    musicArtist: String!
    specialArtist: [String]
    tickets: [ID!]
    updatedAt: String!
    createdAt: String!
  }

  type Order {
    _id: ID!
    totalPrice: Int!
    ticketItems: [Ticket]!
    paymentDate: String!
  }

  type Ticket {
    _id: ID!
    user: User!
    seatNumber: Int!
    ticketClass: ticketClass!
  }

  enum ticketClass {
    BACKSEAT
    STANDART
    VIP
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    createUser(email: String!, password: String!, username: String!, phone: Int!): User!
  }
`;
