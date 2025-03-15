import gql from 'graphql-tag';

export const MessageTypeDefs = gql`
  scalar Date

  type Conversation {
    _id: ID!
    userId: ID!
    name: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    _id: ID!
    conversationId: Conversation!
    query: String!
    response: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input SendMessageInput {
    conversationId: ID!
    query: String!
  }

  type Query {
    getMessages(conversationId: ID!): [Message]
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
  }
`;
