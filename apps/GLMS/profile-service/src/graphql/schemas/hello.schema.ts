import { gql } from 'graphql-tag';

export const helloProfileSchema = gql`
  type Query {
    helloQueryFromProfileService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromProfileService: String
  }
`;
