import gql from 'graphql-tag';

export const LlamaTypeDefs = gql`
  scalar Date

  input RunOllamaInput {
    prompt: String!
  }

  type RunOllamaResponse {
    response: String!
  }

  type Mutation {
    runOllama(input: RunOllamaInput): RunOllamaResponse!
  }
`;
