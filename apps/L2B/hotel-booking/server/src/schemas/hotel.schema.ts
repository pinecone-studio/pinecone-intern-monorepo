import gql from 'graphql-tag';

export const HotelTypeDefs = gql`
  type Hotel {
    id: ID!
    name: String!
    description: String
    location: String
    images: [String!]!
    rooms: [Room!]!
    createdAt: Date
    updatedAt: Date
  }

  input HotelInput {
    name: String!
    description: String
    location: String
    images: [String!]!
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel
  }

  type Mutation {
    createHotel(input: HotelInput!): Hotel!
    updateHotel(id: ID!, input: HotelInput!): Hotel!
    deleteHotel(id: ID!): SuccessResponse!
  }
`;
