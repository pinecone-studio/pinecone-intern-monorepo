import gql from 'graphql-tag';

export const concertTypeDefs = gql`
  type VipTicket {
    price: Int
    quantity: Int
  }

  type RegularTicket {
    price: Int
    quantity: Int
  }

  type StandingAreaTicket {
    price: Int
    quantity: Int
  }

  type Concert {
    _id: ID!
    concertName: String!
    concertPlan: String!
    artistName: [String]!
    concertDay: Date!
    concertTime: String!
    concertPhoto: String!
    vipTicket: VipTicket
    regularTicket: RegularTicket
    standingAreaTicket: StandingAreaTicket
  }

  input VipTicketInput {
    price: Int!
    quantity: Int!
  }

  input RegularTicketInput {
    price: Int!
    quantity: Int!
  }

  input StandingAreaTicketInput {
    price: Int!
    quantity: Int!
  }

  input ConcertInput {
    concertName: String!
    concertPlan: String!
    artistName: [String]!
    concertDay: Date!
    concertTime: String!
    concertPhoto: String!
    vipTicket: VipTicketInput!
    regularTicket: RegularTicketInput!
    standingAreaTicket: StandingAreaTicketInput!
  }

  input UpdateTicketInput {
    concertID: String!
    vipTicketQuantity: Int
    standartTicketQuantity: Int
    standingAreaTicketQuantity: Int
    ticketNumber: Int
  }
  type Ticket {
    _id: ID
    concertID: String!
    vipTicketQuantity: Int
    standartTicketQuantity: Int
    standingAreaTicketQuantity: Int
  }

  input EditConcertInput {
    id: String!
    concertName: String!
    artists: [String!]
    concertDay: String!
    concertTime: String!
    vipTicket: VipTicketInput!
    regularTicket: RegularTicketInput!
    standingAreaTicket: StandingAreaTicketInput!
    concertPlan: String!
  }
  type EditConcert {
    _id: ID!
    concertName: String!
    concertPlan: String!
    artistName: [String]!
    concertDay: Date!
    concertTime: String!
    vipTicket: VipTicket
    regularTicket: RegularTicket
    standingAreaTicket: StandingAreaTicket
  }
  type Mutation {
    createConcert(input: ConcertInput!): Concert!
    updateConcertTicket(input: UpdateTicketInput!): Concert!
    deleteConcert(_id: String!): Concert!
    editConcert(input: EditConcertInput!): EditConcert!
  }
  type Query {
    getConcerts: [Concert!]!
    getConcert(_id: String!): Concert!
  }
`;
