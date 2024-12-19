import gql from 'graphql-tag';

export const typeDefs = gql`
  type Posts {
    _id: ID!
    userId: User!
    images: [String!]!
    caption: String!
    createdAt: Date!
    updatedAt: Date!
  }
  input CreatePostInput {
    userId: ID!
    images: [String!]!
    caption: String!
  }
  input UpdatePostInput {
    caption: String
    images: [String]
  }
  type Query {
    getAllPosts: [Posts!]!
    getPostById(postId: ID!): Posts!
    getPostByUserId(userId: ID!): [Posts!]!
    getPostsByFollowersId(followerId: ID!): [Posts!]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Posts!
    updatePostById(postId: ID!, input: UpdatePostInput!): Posts!
    deletePost(_id: ID!): Response!
  }
`;
