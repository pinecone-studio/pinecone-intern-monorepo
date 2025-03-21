import gql from 'graphql-tag';

export const ConversationTypeDefs = gql`
  scalar Date
    
  type Conversation {
    _id: ID!
    userId: ID!
    name: String
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateConversationInput {
    userId: ID!
    name: String
  }

  type Query {
    getConversations(userId: ID!): [Conversation]
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Conversation!
  }
`;
