import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  enum PostStatus {
    pending
    approved
    declined
  }

  enum PropertyType {
    apartment
    house
    office
  }

  input LocationInput {
    address: String
    city: String
    district: String
  }
  type Location {
    address: String
    city: String
    district: String
  }
  type Post {
    _id: ID!
    propertyOwnerId: ID!
    title: String!
    description: String!
    price: Float!
    images: [String]
    type: PropertyType
    size: Float
    totalRooms: Int
    garage: Boolean
    restrooms: Int
    location: Location
    completionDate: Date
    windowsCount: Int
    windowType: String
    roofMaterial: String
    floorNumber: Int
    balcony: Boolean
    totalFloors: Int
    lift: Boolean
    status: PostStatus!
    updatedAt: Date!
    createdAt: Date!
  }

  input CreatePostInput {
  propertyOwnerId: ID!
  title: String!
  description: String!
  price: Float!
  images: [String]
  type: PropertyType
  size: Float
  totalRooms: Int
  garage: Boolean
  restrooms: Int
  location: LocationInput
  completionDate: Date
  windowsCount: Int
  windowType: String
  roofMaterial: String
  floorNumber: Int
  balcony: Boolean
  totalFloors: Int
  lift: Boolean
}


  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }

  type Query {
    getPosts: [Post!]
    getPostsById(propertyOwnerId: ID!): [Post!]
  }
`;
