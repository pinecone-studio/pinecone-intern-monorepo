import { gql } from 'graphql-tag';

export const helloCoursesSchema = gql`
  type Query {
    helloQueryFromCoursesService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromCoursesService: String
  }
`;
