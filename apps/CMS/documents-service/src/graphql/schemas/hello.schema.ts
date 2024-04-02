import { gql } from 'graphql-tag';

export const helloDocumentsSchema = gql`
  type Query {
    helloQueryFromDocumentsService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromDocumentsService: String
  }
`;
