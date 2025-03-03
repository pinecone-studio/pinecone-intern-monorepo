import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    sessionToken: String!
    createdAt: Date!
    updatedAt: Date!
  }
    
  type Conversation {
    id: ID!
    userId: ID!
    name: String
    createdAt: Date!
  }

  type Message {
    id: ID!
    chatID: ID!
    query: String!
    response: String!
    timestamp: Date!
  }
    
  type CreateThreadInput {
    userId: ID!
    name: String
  }

  input SendMessageInput {
    chatID: ID!
    query: String!
  }
  
  type Mutation {
    sampleMutation: String!
    sendMessage(input: SendMessageInput): Message!
  }

  type Query {
    sampleQuery: String!
    getMessagesForConversation(conversationID: ID!): [Message]
  }
`;
