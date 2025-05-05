import gql from "graphql-tag";
export const typeDefs = gql`
  scalar Date

  enum PostStatus {
    pending
    approved
    declined
  }

  type Post {
    _id: ID!
    propertyOwnerId: ID!
    title: String!
    description: String!
    price: Float!
    propertyDetail: ID!
    status: PostStatus!
    updatedAt: Date!
    createdAt: Date!
  }

  input CreatePostInput {
    propertyOwnerId: ID!
    title: String!
    description: String!
    price: Float!
    propertyDetail: ID!
  }
  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }

  type Query {
    GetPosts: [Post!]!
    post(id: ID!): Post
  }
`;