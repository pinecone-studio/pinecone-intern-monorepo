import gql from 'graphql-tag';

export const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    artistName: [String!]!
    description: String!
    startTime: Date!
    endTime: Date!
    images: [String!]!
    venues: [Venue!]!
  }
`;
