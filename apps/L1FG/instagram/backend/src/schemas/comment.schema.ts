import gql from 'graphql-tag';

export const CommentTypeDefs = gql`
  type Comment {
    _id: ID
    comment: String
    userId: ID
    postId: ID
    createdAt: Date
    updatedAt: Date
  }
  type CommentDetailType {
    _id: ID
    comment: String
    userId: ID
    postId: ID
    createdAt: Date
    updatedAt: Date
    user: UserTogetherUserType
    likeCount: Int
  }
  input CommentInput {
    comment: String!
    postId: ID!
  }
  input GetCommentInput {
    postId: ID!
  }
  type Query {
    getComments(input: GetCommentInput!): [CommentDetailType!]
  }
  type Mutation {
    createComment(input: CommentInput!): Comment!
  }
`;
