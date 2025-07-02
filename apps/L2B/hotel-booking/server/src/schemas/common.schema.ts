import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }
  type SuccessResponse {
    success: Boolean!
    message: String!
  }
  type Query {
    sampleQuery: String!
  }
  type Mutation {
    sampleMutation: String!
  }
`;
