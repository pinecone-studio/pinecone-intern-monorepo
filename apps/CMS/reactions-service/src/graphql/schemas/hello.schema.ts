import { gql } from 'graphql-tag';

export const helloReactionsSchema = gql`
  type Query {
    helloQueryFromReactionsService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromReactionsService: String
  }
`;
