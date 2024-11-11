import gql from 'graphql-tag';

export const typeDefs = gql`
  type Venue {
    _id: ID!
    name: [VenueType!]!
    price: Int!
    additional: [String!]!
  }

  type VenueType {
    nameType: String!
    quantity: Int!
  }
`;
