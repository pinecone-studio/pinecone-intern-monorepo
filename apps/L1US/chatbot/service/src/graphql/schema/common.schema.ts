import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar Date

  type Service {
    sdl: String!
  }

  type Query {
    _service: Service!
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
  }
`;
