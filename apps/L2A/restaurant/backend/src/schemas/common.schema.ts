import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type Category {
    _id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
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
