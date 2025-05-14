import gql from 'graphql-tag';

export const queryTypeDefs = gql`
  scalar JSON

  scalar Date

  type Query {
    sampleQuery: String!
  }
`;
