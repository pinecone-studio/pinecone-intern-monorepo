import gql from 'graphql-tag';

export const PropertyTypeDefs = gql`
  enum HouseTypeEnum {
    House
    Apartment
    Office
  }

  type Property {
    _id: ID!
    houseType: HouseTypeEnum!
    size: String!
    images: [String!]
    totalRooms: Int!
    garage: Boolean!
    restrooms: Int!
    location: LocationType!
    details: DetailsType!
    uploadedAt: Date
    createdAt: Date
  }

  type LocationType {
    address: String!
    city: String!
    district: String!
  }
  input LocationTypeInput {
    address: String!
    city: String!
    district: String!
  }

  type DetailsType {
    completionDate: Date
    windowsCount: Int!
    windowType: String!
    floorMaterial: String!
    floorNumber: Int!
    balcony: Boolean!
    totalFloors: Int!
    lift: Boolean!
  }
  input DetailsInput {
    completionDate: Date
    windowsCount: Int!
    windowType: String!
    floorMaterial: String!
    floorNumber: Int!
    balcony: Boolean!
    totalFloors: Int!
    lift: Boolean!
  }

  input PropertyInput {
    houseType: HouseTypeEnum!
    size: String!
    images: [String!]
    totalRooms: Int!
    garage: Boolean!
    restrooms: Int!
    location: LocationTypeInput!
    details: DetailsInput!
    uploadedAt: Date
    createdAt: Date
  }

  type Mutation {
    addProperty(input: PropertyInput!): Property
  }
`;
