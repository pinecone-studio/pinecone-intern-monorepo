import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Artist {
    _id: ID!
    artistName: String!
    additional: String!
    status: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input ArtistInput {
    artistName: String!
    additional: String!
    status: String
  }

  input UpdateArtistInput {
    _id: ID!
    artistName: String
    additional: String
    status: String
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
