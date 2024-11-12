import gql from 'graphql-tag';

export const typeDefs = gql`
  type Venue {
    _id: ID!
    name: [VenueType!]!
    additional: [String!]!
  }

  type VenueType {
    nameType: String!
    quantity: Int!
    price: Int!
  }

  input VenueInput {
    nameType: String!
    quantity: Int!
    price: Int!
  }

  type Query {
    getVenues: [Venue!]!
  }

  type Mutation {
    createVenue(name: [VenueInput!]!, additional: [String!]!): Venue!
  }
`;
