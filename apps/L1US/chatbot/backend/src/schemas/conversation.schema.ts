import gql from 'graphql-tag';

export const ConversationTypeDefs = gql`
  scalar Date

  type Conversation {
    userId: ID!
    name: String
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateConversationInput {
    userId: ID!
    name: String
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Conversation!
  }
`;
