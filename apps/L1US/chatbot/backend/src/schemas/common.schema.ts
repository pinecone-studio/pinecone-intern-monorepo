import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type Query {
    sampleQuery: String!
  }

  type ResponseType {
    input: String
    output: String
  }

  type Query {
    getResponse(prompt: String!): ResponseType
  }

  type Mutation {
    sampleMutation: String!
  }
`;
