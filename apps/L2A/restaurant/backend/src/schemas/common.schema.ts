import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type Service {
    sdl: String!
  }

  type Query {
    sampleQuery: String!
    _service: Service!
  }

  type Mutation {
    sampleMutation: String!
  }
`;
