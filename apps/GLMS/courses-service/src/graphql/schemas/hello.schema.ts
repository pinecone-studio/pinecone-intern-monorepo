import { gql } from 'graphql-tag';

export const helloCoursesSchema = gql`
  type Query {
    helloQueryFromCoursesService: String
  }

  type Mutation {
    helloMutationFromCoursesService: String
  }
`;
