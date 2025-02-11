import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  input KeyValueInput {
    key: String!
    value: String!
  }

  type KeyValue {
    key: String!
    value: String!
  }

  input CreateHotelInput {
    name: String!
    phoneNumber: String
    rating: Float
    starRating: Float
    description: String
    images: [String!]!
    rooms: [ID]
    faqs: [KeyValueInput]
    policies: [KeyValueInput]
    about: [KeyValueInput]
    location: LocationInput!
    locationName: String
    amenities: [String]
  }

  input LocationInput {
    type: String!
    coordinates: [Float!]!
  }

  type Hotel {
    id: ID!
    name: String!
    phoneNumber: String
    rating: Float
    starRating: Float
    description: String
    images: [String!]!
    rooms: [ID]
    faqs: [KeyValue]
    policies: [KeyValue]
    about: [KeyValue]
    location: Location
    locationName: String
    amenities: [String]
  }

  type Location {
    type: String!
    coordinates: [Float!]!
  }

  input editGeneralInfoInput {
    id: ID!
    name: String
    description: String
    starRating: Float
    rating: Float
    phoneNumber: String
  }

  type CreateHotelResponse {
    code: Int!
    success: Boolean!
    message: String!
    hotel: Hotel
  }

  input editAmenitiesInput {
    id: ID!
    amenities: [String]
  }
  input editLocationInput {
    id: ID!
    location: LocationInput
    locationName: String
  }
  input editImagesInput {
    id: ID!
    images: [String]
  }

  input getHotelsByNameInput {
    name: String
  }
  input getHotelsByPriceInput {
    type: String
  }

  input getHotelsByDateTravellerInput {
    startDate: Date!
    endDate: Date!
    travellerCount: Int!
  }

  input getAllQuerieInput {
    startDate: Date!
    endDate: Date!
    travellerCount: Int!
    type: String
    sortByRating: Boolean
  }

  type Mutation {
    editGeneralInfo(input: editGeneralInfoInput!): Hotel
    createHotel(input: CreateHotelInput!): CreateHotelResponse!
    editAmenities(input: editAmenitiesInput!): Hotel
    editLocation(input: editLocationInput!): Hotel
    editImages(input: editImagesInput!): Hotel
  }
  type Query {
    getHotels: [Hotel!]!
    getHotelById(id: ID!): Hotel
    getHotelsByName(input: getHotelsByNameInput!): [Hotel]
    getHotelsByPrice(input: getHotelsByPriceInput!): [Hotel]
    getAllQuerie(input: getAllQuerieInput!): [Hotel]
    getHotelsByStarRating(sortByRating: Boolean): [Hotel]
    getHotelsByDateTraveller(input: getHotelsByDateTravellerInput!): [Hotel]
  }
`;
