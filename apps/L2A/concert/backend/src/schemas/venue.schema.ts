import gql from "graphql-tag";

export const VenueTypeDefs = gql`
  type Venue {
    id: ID!
    name: String!
    address: String!
    city: String!
    capacity: Int!
  }
`;