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
    commentCount:Int!
    likeCount:Int!
    hasLiked:Boolean
    user:UserTogetherUserType 
}

input PostInput {
    postImage: [String!]!
    caption: String
  }
 type Query {
    getPosts(searchingUserId:ID!):[UserPostType]
 }
  type Mutation {
    createPost(input: PostInput!): Post!
  }
`;
