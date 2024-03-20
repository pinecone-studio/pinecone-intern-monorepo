import { gql } from 'graphql-tag';

export const helloAssessmentSchema = gql`
  type Query {
    helloQueryFromAssessmentService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromAssessmentService: String
  }
`;
