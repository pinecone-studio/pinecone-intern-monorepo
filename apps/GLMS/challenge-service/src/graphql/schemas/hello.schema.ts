import { gql } from 'graphql-tag';

export const helloChallengeSchema = gql`
  type Query {
    helloQueryFromChallengeService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromChallengeService: String
  }
`;
