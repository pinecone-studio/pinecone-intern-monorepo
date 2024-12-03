import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Artist {
    _id: ID!
    artistName: String!
    image: String!
    additional: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input ArtistInput {
    artistName: String!
    image: String!
    additional: String!
  }

  input UpdateArtistInput {
    _id: ID!
    artistName: String
    image: String
    additional: String
  }

  type Query {
    getArtists: [Artist!]!
  }

  type Mutation {
    createArtist(input: ArtistInput!): Artist!
    deleteArtist(_id: ID!): Artist!
    updateArtist(input: UpdateArtistInput!): Artist!
  }
`;
