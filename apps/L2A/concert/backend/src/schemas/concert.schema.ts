import gql from 'graphql-tag';

export const ConcertTypeDefs = gql`
  type Concert {
    id: ID!
    title: String!
    description: String!
    thumbnailUrl: String!
    doorOpen: String!
    musicStart: String!
    venue: Venue!
    primaryPrice: Int!
    artistName: String!
    specialGuestName: String
    seatData: [SeatData]!
    endDate: String!
  }

  input CreateConcertInput {
    title: String!
    description: String!
    thumbnailUrl: String!
    doorOpen: String!
    musicStart: String!
    venue: ID!
    artistName: String!
    specialGuestName: String
    seatData: [SeatDataInput!]!
    endDate: String!
  }
`;
