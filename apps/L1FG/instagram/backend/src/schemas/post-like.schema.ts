import gql from 'graphql-tag';
export const PostLikeTypeDefs = gql`
  type PostLike {
    _id: ID
    userId: ID!
    postId: ID!
  }
  input PostLikeInput {
    postId: ID!
    ownerUserId: ID!
  }
  type Mutation {
    createPostLike(input: PostLikeInput!): PostLike!
    deletePostLike(postId: String!): PostLike
  }
`;
