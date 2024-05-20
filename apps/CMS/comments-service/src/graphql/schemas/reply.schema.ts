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
  type Mutation {
    publishReply(createInput: CreateReplyInput!): ID!
  }
  type Query {
    getRepliesByCommentId(commentId: String): [Reply]
    getRepliesByParentId(parentId: String): [Reply]
  }
`;
