import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Upload

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Message {
    id: ID!
    text: String
    sender: String!
    images: [String!]!
    timeStamp: Date
  }

  input AddMessageInput {
    content: String!
    senderId: ID!
    receiverId: ID!
    attachments: [Upload!] # Updated to handle multiple attachments as Upload type
    images: [String!]!
  }

  type Conversation {
    id: ID!
    userOne: User
    userTwo: User
    messages: [Message!]!
  }

  type AllConversation {
    id: ID!
    userOne: User
    userTwo: User
  }

  type Query {
    getConversation(userOne: String!, userTwo: String!): Conversation
    getAllConversations: [AllConversation!]!
  }

  type Mutation {
    addMessage(input: AddMessageInput!): Message!
  }
`;
