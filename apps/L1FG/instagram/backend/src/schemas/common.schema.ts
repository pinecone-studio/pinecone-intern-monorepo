import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date 
  enum Response {
    Success
  }
  type Query {
    sampleQuery: String!
  }
  type Mutation {
    sampleMutation: String!
  }
`;
