import gql from 'graphql-tag';

export const typeDefs = gql`
  type Message {
    _id: ID!
    content: String!
    sender: User!
    receiver: User!
    createdAt: Date!
  }

  input AddMessageInput {
    content: String!
    senderId: ID!
    receiverId: ID!
  }

  type Mutation {
    addMessage(userId: String!, content: String!, chosenUserId: String): Message
  }
`;
