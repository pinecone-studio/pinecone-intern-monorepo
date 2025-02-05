import gql from 'graphql-tag';
export const PostLikeTypeDefs = gql`
  type PostLike {
    _id: ID
    userId: ID!
    postId: ID!
  }
  input PostLikeInput {
    postId: ID!
    ownerUserId: ID
  }
<<<<<<< HEAD
=======

  type LikedType {
    hasLiked: Boolean
  }

  type LikeType {
    postImage: String
  }

  type Query {
    getPostLike: LikeType!
    getLikedPost: LikedType
    getwhoLikedPost: LikeType
  }

>>>>>>> 3414164b8 (feat(insta): notification be)
  type Mutation {
    createPostLike(input: PostLikeInput!): PostLike!
    deletePostLike(postId: String!): PostLike
  }
`;
