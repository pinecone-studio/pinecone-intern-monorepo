import gql from 'graphql-tag';

export const typeDefs = gql`
  # Scalars
  scalar JSON
  scalar Date

  # Enums
  enum Response {
    Success
  }

  # Queries
  type Query {
    helloQuery: String!
  }

  # Mutations
  type Mutation {
    helloMutation: String!
  }
`;
