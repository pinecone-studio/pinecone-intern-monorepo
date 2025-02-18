import gql from 'graphql-tag';
export const PostLikeTypeDefs = gql`
  type PostLike {
    _id: ID!
    userId: ID!
    postId: ID!
  }
  type PostLikedPeopleType {
    _id: ID!
    userId: ID!
    postId: ID!
    user: UserTogetherUserType!
  }
  input PostLikeInput {
    postId: ID!
    ownerUserId: ID!
  }
  type Query {
    getlikePost(postId: ID!): [PostLikedPeopleType!]!
  }
  type Mutation {
    createPostLike(input: PostLikeInput!): PostLike!
    deletePostLike(input: PostLikeInput!): PostLike!
  }
`;
