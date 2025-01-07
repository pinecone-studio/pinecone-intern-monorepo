import gql from 'graphql-tag';

export const typeDefs = gql`
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
    userOne: String!
    userTwo: String!
    messages: [Message!]!
  }

  type Query {
    getConversation(userOne: String!, userTwo: String!): Conversation
  }

  type Mutation {
    addMessage(userId: String!, content: String!, chosenUserId: String!): Message!
  }
`;
