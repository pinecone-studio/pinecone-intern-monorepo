import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
  }
`;
