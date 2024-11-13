import gql from 'graphql-tag';

export const typeDefs = gql`
  type Posts {
    _id: ID!
    userId: ID!
    images: [String!]!
    caption: String!
    likeCounts: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  input CreatePostInput {
    userId: ID!
    images: [String!]!
    caption: String!
  }
  type Query {
    getAllPosts: [Posts!]!
    getPostById(postId: ID!): Posts!
  }

  input UpdatePostInput {
    caption: String
    images: [String]
  }

  type Mutation {
    createPost(input: CreatePostInput!): Posts!
    updatePostById(postId: ID!, input: UpdatePostInput!): Posts!
    deletePost(_id: ID!): Response!
  }
`;
