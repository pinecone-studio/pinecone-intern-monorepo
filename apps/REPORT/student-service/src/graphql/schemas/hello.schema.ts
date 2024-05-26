/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const helloStudentSchema = gql`
  type Query {
    helloQueryFromStudentService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromStudentService: String
  }
`;
