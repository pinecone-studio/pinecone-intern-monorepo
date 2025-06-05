import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  enum PostStatus {
    PENDING
    SALE
    APPROVED
    DECLINED
    SOLD
    SAVED
  }
  enum feature{
    CENTRAL
     AIRY
     PREMIUM_ZONE
  }

  enum PropertyType {
    APARTMENT
    HOUSE
    OFFICE
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
    ownerName: String
    description: String
    number:Int
    feature: [feature]
    price: Float
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
    door:String
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
  ownerName: String
  description: String!
  number:Int
  feature: [feature]
  price: Float!
  images: [String]
  type: PropertyType
  size: Float
  totalRooms: Int
  garage: Boolean
  restrooms: Int
  location: LocationInput
  completionDate: String
  windowsCount: Int
  windowType: String
  roofMaterial: String
  floorNumber: Int
  door:String
  balcony: Boolean
  totalFloors: Int
  lift: Boolean
  status: PostStatus!
}

input UpdatePostInput {
  propertyOwnerId: ID!
  title: String
  ownerName: String
  description: String
  number:Int
  feature: [feature]
  price: Float
  images: [String]
  type: PropertyType
  size: Float
  totalRooms: Int
  garage: Boolean
  restrooms: Int
  location: LocationInput
  completionDate: String
  windowsCount: Int
  windowType: String
  roofMaterial: String
  floorNumber: Int
  door:String
  balcony: Boolean
  totalFloors: Int
  lift: Boolean
  status: PostStatus
}

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    deletePostById(_id: ID!): Post!
    updatePostById(_id: ID!, input: UpdatePostInput!): Post!
  }

  type Query {
    getPosts: [Post!]
    getPostsByUserId(propertyOwnerId: ID!): [Post!]
    getPostById(_id: ID!): Post

  }
`;
