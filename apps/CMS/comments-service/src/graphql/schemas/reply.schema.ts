import gql from 'graphql-tag';

export const replySchema = gql`
  scalar Date
  type Reply {
    _id: ID!
    reply: String!
    commentId: String!
    name: String!
    parent: Reply
    createdAt: Date
    ipAddress: String
  }
  input CreateReplyInput {
    reply: String!
    commentId: ID!
    parentId: ID
    name: String!
    email: String!
  }
  input UpdateReplyInput {
    _id: ID!
    reply: String!
    name: String!
    email: String!
  }
  input DeleteReplyInput {
    _id: ID!
  }
  type Mutation {
    publishReply(createInput: CreateReplyInput!): ID!
    updateReply(updateInput: UpdateReplyInput!): ID!
    deleteReply(deleteInput: DeleteReplyInput!): ID!
  }
  type Query {
    getRepliesByCommentId(commentId: String): [Reply]
    getRepliesByParentId(parentId: String): [Reply]
  }
`;
