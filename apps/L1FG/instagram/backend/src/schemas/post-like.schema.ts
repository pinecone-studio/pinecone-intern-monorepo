import gql from 'graphql-tag';
export const PostLikeTypeDefs = gql`
  type PostLike {
    _id: ID
    userId: ID!
    postId: ID!
    hasLiked: Boolean
  }

  input PostLikeInput {
    postId: ID!
    ownerUserId: ID
  }

  type LikedType {
    hasLiked: Boolean
  }

  type LikeType {
    userName: String
    hasStory: Boolean
    profileImage: String
    postImage: String
  }

  type Query {
    getPostLike: LikeType!
    getLikedPost: LikedType
  }

  type Mutation {
    createPostLike(input: PostLikeInput!): PostLike!
    deletePostLike(postId: String!): PostLike
  }
`;
