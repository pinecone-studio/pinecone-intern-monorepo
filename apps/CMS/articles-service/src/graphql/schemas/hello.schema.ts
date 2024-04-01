import { gql } from 'graphql-tag';

export const helloArticlesSchema = gql`
  type Query {
    helloQueryFromArticlesService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromArticlesService: String
  }
`;
