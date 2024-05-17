import gql from 'graphql-tag';

export const replySchema = gql`
  scalar Date
  enum ReplyStatus {
    NORMAL
    DELETED
    HIDDEN
  }
  type Reply {
    _id: ID!
    reply: String!
    commentId: String!
    name: String!
    parent: Reply
    createdAt: Date
    ipAddress: String
    status: ReplyStatus
  }
  input CreateReplyInput {
    reply: String!
    commentId: ID!
    parentId: ID
    name: String!
    email: String!
  }
  type Mutation {
    publishReply(createInput: CreateReplyInput): ID!
    hideReplyByAdmin(id: ID!): ID!
    deleteReplyByAdmin(id: ID!): ID!
    setReplyStatusToNormal(id: ID!): ID!
  }
  type Query {
    getRepliesByCommentId(commentId: String): [Reply]
    getRepliesByParentId(parentId: String): [Reply]
  }
`;
