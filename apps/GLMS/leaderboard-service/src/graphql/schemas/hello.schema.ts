import { gql } from 'graphql-tag';

export const helloLeaderboardSchema = gql`
  type Query {
    helloQueryFromLeaderboardService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromLeaderboardService: String
  }
`;
