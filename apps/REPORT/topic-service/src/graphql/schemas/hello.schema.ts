/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const helloTopicSchema = gql`
  type Query {
    helloQueryFromTopicService: String
  }

  # ******************** Mutations ********************
  type Mutation {
    helloMutationFromTopicService: String
  }
`;
