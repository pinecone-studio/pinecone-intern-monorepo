import gql from 'graphql-tag';

export const PropertyTypeDefs = gql`
  enum HouseTypeEnum {
    House
    Apartment
    Office
  }

  type Property {
    houseType: HouseTypeEnum!
    size: String!
    images: [String!]!
    totalRooms: Int!
    garage: Boolean!
    restrooms: Int!
    location: LocationType!
    details: DetailsType
    uploadedAt: Date
    createdAt: Date
  }

  type LocationType {
    address: String
    city: String
    district: String
    subDistrict: String
  }
  input LocationTypeInput {
    address: String!
    city: String!
    district: String!
    subDistrict: String!
  }
  input LocationUpdateInput {
    address: String
    city: String
    district: String
    subDistrict: String
  }

  type DetailsType {
    completionDate: Date
    windowsCount: Int
    windowType: String
    floorMaterial: String
    floorNumber: Int
    balcony: Boolean
    totalFloors: Int
    lift: Boolean
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
  input DetailsUpdateInput {
    completionDate: Date
    windowsCount: Int
    windowType: String
    floorMaterial: String
    floorNumber: Int
    balcony: Boolean
    totalFloors: Int
    lift: Boolean
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
  input PropertyUpdateInput {
    houseType: HouseTypeEnum
    size: String
    images: [String]
    totalRooms: Int
    garage: Boolean
    restrooms: Int
    location: LocationUpdateInput
    details: DetailsUpdateInput
    uploadedAt: Date
    createdAt: Date
  }
  input QueryOptions {
    filter: JSON
  }

  type Mutation {
    addProperty(input: PropertyInput!): Property!
  }

  type Query {
    getProperties(options: QueryOptions): [Property!]!
    getPropertyByID(_id: ID!): Property!
  }
`;
