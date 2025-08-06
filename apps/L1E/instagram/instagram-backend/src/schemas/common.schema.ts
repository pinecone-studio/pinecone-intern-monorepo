import gql from 'graphql-tag';

export const typeDefs = gql`
  # Scalars
  scalar JSON
  scalar Date

  # Enums
  enum Response {
    Success
  }


type User {
  id: ID!
  email: String!
  username: String!
  bio: String
  phone: String
  gender: String
  profilePhoto: String
  followers: [User!]!
  following: [User!]!
}

  type Post {
  id: ID!
  author: User!
  caption: String
  image: String!
  likes: [User!]!
  comments: [Comment!]!
  createdAt: String!
  isPublic: Boolean!
}

type Comment {
  id: ID!
  author: User!
  text: String!
  createdAt: String!
}

  # Queries

type Query {
  getFeed: [Post!]!
}


  # Mutations

type Mutation {
  updateProfile(
    username: String
    bio: String
    phone: String
    gender: String
  ): User!
  uploadProfilePhoto(photo: Upload!): User!
  removeProfilePhoto: User!
  followUser(userId: ID!): User!
  unfollowUser(userId: ID!): User!

  createPost(
    caption: String
    image: Upload!
    isPublic: Boolean!
  ): Post!
  editPost(
    postId: ID!
    caption: String
    isPublic: Boolean
  ): Post!
  deletePost(postId: ID!): Boolean!
  likePost(postId: ID!): Post!
  unlikePost(postId: ID!): Post!
  addComment(postId: ID!, text: String!): Comment!
  deleteComment(commentId: ID!): Boolean!
}




`;
