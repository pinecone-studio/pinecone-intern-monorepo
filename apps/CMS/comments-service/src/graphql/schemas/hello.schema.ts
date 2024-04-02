import { gql } from 'graphql-tag';

export const helloCommentsSchema = gql`
  type Query {
    helloQueryFromCommentsService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromCommentsService: String
  }
`;
