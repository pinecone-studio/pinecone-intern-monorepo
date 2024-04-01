import { gql } from 'graphql-tag';

export const helloPayrollSchema = gql`
  type Query {
    helloQueryFromPayrollService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromPayrollService: String
  }
`;
