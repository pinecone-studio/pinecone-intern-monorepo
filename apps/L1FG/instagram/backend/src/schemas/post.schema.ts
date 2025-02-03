import gql from 'graphql-tag';

export const PostTypeDefs = gql`
  type Post {
    _id: ID
    postImage: [String!]!
    caption: String
    userId: ID
    carouselMediaCount: Int
    createdAt: Date
  }

  type UserPostType {
    _id: ID
    postImage: [String!]!
    caption: String
    userId: ID
    carouselMediaCount: Int
    createdAt: Date
    commentCount: Int!
    likeCount: Int!
    hasLiked: Boolean
    user: UserTogetherUserType
  }
  type PostsEdge {
    cursor: ID!
    node: UserPostType!
  }
  type PageInfo {
    startCursor: ID!
    endCursor: ID!
    hasNextPage: Boolean
  }
  type PostsConnection {
    edges: [PostsEdge!]!
    pageInfo: PageInfo
  }

  input PostInput {
    postImage: [String!]!
    caption: String
  }
  input SmallPostsInput {
    after: ID
    first: Int!
  }
  type Query {
    getPosts(searchingUserId: ID!): [UserPostType]
    getAllPosts: [UserPostType]
    getSmallPosts(input: SmallPostsInput!): PostsConnection!
  }
  type Mutation {
    createPost(input: PostInput!): Post!
  }
`;
