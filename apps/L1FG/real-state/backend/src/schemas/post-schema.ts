import gql from 'graphql-tag';

export const PostTypeDefs = gql`
  scalar JSON

  enum PostStats {
    PENDING
    APPROVED
    DECLINED
  }

  type Post {
    _id: ID!
    propertyOwnerId: User!
    title: String!
    description: String!
    price: String!
    propertyDetail: Property!
    status: PostStats!
    updatedAt: String
    createdAt: String
  }

  input PostInput {
    title: String!
    propertyOwnerId: ID!
    price: String!
    propertyDetail: PropertyInput!
    description: String!
    status: PostStats!
    updatedAt: String
    createdAt: String
  }

  input PostUpdateInput {
    title: String
    description: String
    price: String
    propertyDetail: PropertyUpdateInput
    status: PostStats
    updatedAt: String
    createdAt: String
  }

  type Query {
    getPostById(_id: ID!): Post!
    getPosts(input: JSON): [Post!]!
  }

  type Mutation {
    addPost(input: PostInput!): Post!
    updatePost(_id: ID!, input: PostUpdateInput!): Post!
    deletePost(_id: ID!): Post!
  }
`;
