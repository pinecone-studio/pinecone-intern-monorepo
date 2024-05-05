import { gql } from 'graphql-tag';

export const helloLeavingSchema = gql`
  type Query {
    helloQueryFromLeavingService:  String 
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromLeavingService: String
  }
`;
