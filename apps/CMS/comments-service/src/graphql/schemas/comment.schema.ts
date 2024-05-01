import gql from 'graphql-tag';
export const commentsSchema = gql`
  scalar Date
  input CreateCommentInput {
    entityType: String!
    entityId: String!
    comment: String!
    name: String!
    email: String!
    articleId: String!
  }
  type Comment {
    _id: ID
    name: String
    email: String
    comment: String
    ipAddress: String
    createdAt: Date
    articleId: String
  }
  input UpdateCommentInput {
    _id: ID!
    comment: String!
  }
  input DeleteCommentInput {
    _id: ID!
  }
  input HideCommentByAdminInput {
    _id: ID!
  }
  input RemoveCommentByAdminInput {
    _id: ID!
  }
  type Mutation {
    publishComment(createInput: CreateCommentInput!): ID!
    updateComment(updateInput: UpdateCommentInput!): ID!
    deleteComment(deleteInput: DeleteCommentInput!): ID!
    hideCommentByAdmin(hideInput: HideCommentByAdminInput!): ID!
    deleteCommentByAdmin(removeInput: RemoveCommentByAdminInput!): ID!
  }
  type Query {
    getComments: [Comment]
  }
`;
