import gql from "graphql-tag";

export const typeDefs = gql`
type Post {
_id: ID!
image: [String!]!
description: String
user: User! 
likes: [Like!]!
comments: [Comment!]!
createdAt: Date!
}

extend type Query {
  getPosts: [Post!]!
  getMyPosts: [Post!]!
}

extend type Mutation {
  createPost(image: [String!]!, description: String): Post!
}
`