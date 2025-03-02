import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    sessionToken: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthPayload {
    user: User!
    sessionToken: String!
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

  input RegisterUserInput {
    username: String!
    email: String!
    password: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateThreadInput {
    userId: ID!
    name: String
  }

  input SendMessageInput {
    chatID: ID!
    query: String!
  }

  type Query {
    sampleQuery: String!
    getUser(id: ID!): User!
    getConversation(id: ID!): Conversation!
    getMessagesForConversation(conversation: ID!): [Message]
  }

  type Mutation {
    sampleMutation: String!
    loginUser(input: LoginUserInput!): AuthPayload!
    registerUser(input: RegisterUserInput!): AuthPayload!
    createThread(input: CreateThreadInput!): Conversation!
    sendMessage(input: SendMessageInput!): Message!
  }
`;
