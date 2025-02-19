import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  input CrawlInput {
    url: String!
  }

  type CrawlResponse {
    url: String!
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    crawl(input: CrawlInput!): CrawlResponse!
  }
`;
