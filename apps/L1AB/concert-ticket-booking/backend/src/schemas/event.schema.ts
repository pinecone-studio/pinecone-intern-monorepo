import gql from 'graphql-tag';

export const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    description: String!
    startTime: Date!
    endTime: Date!
    venues: Venue!
  }
`;
