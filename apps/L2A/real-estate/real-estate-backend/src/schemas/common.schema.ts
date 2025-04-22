import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type User {
    _id:String!
    email:String!
    password:String!
    isAdming:String!
    phone:Int!
    updatedAt: Date
    createdAt:Date 
  }

  type tokenResponse {
    token:String!
  }



  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    loginUser(email:String!, password:String!): tokenResponse
  }
`;
