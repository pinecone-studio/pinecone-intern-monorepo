import gql from 'graphql-tag';

export const typeDefs = gql`
  type Artist {
    _id: ID!
    artistName: String!
    image: String!
    additional: String!
  }

  input ArtistInput {
    artistName: String!
    image: String!
    additional: String!
  }

  type Query {
    getArtists: [Artist!]!
  }

  type Mutation {
    createArtist(input: ArtistInput!): Artist!
  }
`;
