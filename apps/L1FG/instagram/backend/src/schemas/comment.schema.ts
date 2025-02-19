import gql from 'graphql-tag';

export const CommentTypeDefs = gql`
  type Comment {
    _id: ID
    comment: String
    userId: ID
    postId: ID
    createdAt: Date
    updatedAt: Date
    likeCount: Int
  }
  type CommentDetailType {
    _id: ID!
    comment: String!
    userId: ID!
    postId: ID!
    createdAt: Date!
    updatedAt: Date!
    commentLiked: Boolean!
    user: UserTogetherUserType!
    likeCount: Int!
  }
  type CommentsEdge {
    cursor: ID!
    node: CommentDetailType!
  }
  type CommentsConnection {
    edges: [CommentsEdge!]!
    pageInfo: PageInfo!
  }
  input CommentInput {
    comment: String!
    postId: ID!
    ownerId: ID!
  }
  input GetCommentInput {
    after: ID!
    first: Int!
    postId: ID!
  }
  type Query {
    getComments(input: GetCommentInput!): CommentsConnection!
  }
  type Mutation {
    createComment(input: CommentInput!): Comment!
    deleteComment(commentId: ID!): Comment!
  }
`;
