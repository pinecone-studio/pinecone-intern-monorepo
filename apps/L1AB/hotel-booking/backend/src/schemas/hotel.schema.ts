import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getAllHotels: [Hotel!]!
    getHotelById(_id: ID!): Hotel!
  }
  type Hotel {
    _id: ID!
    name: String!
    description: String!
    images: [String!]!
    address: String!
    phone: String!
    city: String!
    rating: Float!
    stars: Float!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateHotelInput {
    name: String!
    description: String!
    images: [String!]!
    address: String!
    phone: String!
    city: String!
    stars: Float!
    rating: Float!
  }

  input UpdateHotelInput {
    _id: ID!
    name: String
    description: String
    images: [String!]
    address: String
    phone: String
    city: String
    rating: Float
    stars: Float
  }

  type Mutation {
    createHotel(input: CreateHotelInput): Hotel!
    updateHotel(input: UpdateHotelInput!): Hotel!
    deleteHotel(_id: ID!): Response!
  }
`;
