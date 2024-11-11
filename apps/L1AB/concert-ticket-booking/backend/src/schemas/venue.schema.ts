import gql from 'graphql-tag';

export const typeDefs = gql`
  type Venue {
    _id: ID!
    name: String!
    price: Int!
    additional: [String!]!
  }
`;
