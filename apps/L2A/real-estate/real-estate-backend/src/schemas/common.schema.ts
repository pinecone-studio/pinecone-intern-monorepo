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
    isAdmin:String!
  }

  type tokenResponse {
    token:String!
  }

  type createUserToken{
    token:String!
    user:User!
  }


  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    loginUser(email:String!, password:String!): tokenResponse
    createUser(email:String!, password:String!): createUserToken!
  }
`;
