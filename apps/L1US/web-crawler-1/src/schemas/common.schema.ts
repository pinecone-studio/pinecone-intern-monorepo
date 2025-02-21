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
    links: [String!]!
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    crawl(input: CrawlInput!): CrawlResponse!
  }
`;
