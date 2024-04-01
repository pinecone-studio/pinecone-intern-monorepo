import { gql } from 'graphql-tag';

export const helloRecruitingSchema = gql`
  type Query {
    helloQueryFromRecruitingService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromRecruitingService: String
  }
`;
