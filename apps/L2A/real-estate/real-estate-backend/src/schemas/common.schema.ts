import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type Users {
  _id : ID!
  email: String
  password:String
  isAdmin: Boolean
  phone: Int
  updatedAt: Date
  createdAt: Date
  }

  type Posts {
  _id:ID!
  propertyOwnerId: ID!
  status:PostStatus!
  updatedAt: Date
  createdAt: Date
  }

  type PropertyFeature {
  _id: ID!
  userId: ID!
  image: [String]
  type: PropertyType!
    size: Float
    totalRooms: Int
    garage:Boolean
    restrooms: Int
    location: Location
    details: Details
    updatedAt: Date
    createdAt: Date
  }
   
  type Location {
  address:String
  city:Int
  district:String
  }

  type Details {
  completionDate: Date
  windowsCount:Int
  windowType:String
  floorMaterial:String
  floorNumber:Int
  balcony: Boolean
  totalFloors:Int
  lift:Boolean
  }

  enum PostStatus {
    pending
    approved
    declined
  }

  enum PropertyType {
    house
    appartment
    office
  }
                                                   

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation(
      email: String!
      password:String!
      isAdmin: Boolean!
      phone: Int!
      createdAt: String
      updatedAt: String
    ) : Users

    
  }
`;
