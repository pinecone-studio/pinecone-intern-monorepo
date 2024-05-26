/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const helloAttendanceSchema = gql`
  type Query {
    helloQueryFromAttendanceService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromAttendanceService: String
  }
`;
