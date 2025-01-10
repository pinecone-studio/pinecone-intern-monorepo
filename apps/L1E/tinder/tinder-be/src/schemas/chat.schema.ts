import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Message {
    id: ID!
    text: String!
    sender: String!
  }

  input AddMessageInput {
    content: String!
    senderId: ID!
    receiverId: ID!
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
    addMessage(userId: String!, content: String!, chosenUserId: String!): Message!
  }
`;
