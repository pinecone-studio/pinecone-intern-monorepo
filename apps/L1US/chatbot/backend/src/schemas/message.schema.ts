import gql from 'graphql-tag';

export const MessageTypeDefs = gql`
  scalar Date

  type Message {
    chatId: ID!
    query: String!
    response: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input SendMessageInput {
    chatId: ID!
    query: String!
  }

  type Query {
    getMessages(conversationId: ID!): [Message]
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
  }
`;
