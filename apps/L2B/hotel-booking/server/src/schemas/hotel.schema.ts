import gql from 'graphql-tag';

export const HotelTypeDefs = gql`
  type Hotel {
    _id: ID
    name: String
    location: String
    starRating: Int
    rating: Float
    description: String
    amenities: [String]
    phone: String
    images: [String]
    createdAt: Date
    updatedAt: Date
  }

  type SuccessResponse {
    success: Boolean
    message: String
  }

  input HotelInput {
    name: String
    location: String
    starRating: Int
    rating: Float
    description: String
    amenities: [String]
    phone: String
    images: [String]
  }

  type Query {
    hotels: [Hotel]
    hotel(id: ID): Hotel
  }

  type Mutation {
    createHotel(input: HotelInput): Hotel
    updateHotel(id: ID, input: HotelInput): Hotel
    deleteHotel(id: ID): SuccessResponse
  }
`;
