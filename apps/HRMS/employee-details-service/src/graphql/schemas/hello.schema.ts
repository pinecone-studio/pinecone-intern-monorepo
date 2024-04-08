/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const helloEmployeeDetailsSchema = gql`
  type Query {
    helloQueryFromEmployeeDetailsService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromEmployeeDetailsService: String
  }
  type Mutation {
    userCreate: String
  }
`;
