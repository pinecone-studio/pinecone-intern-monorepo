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

  input PostInput {
    postImage: [String!]!
    caption: String
  }

  type Mutation {
    createPost(input: PostInput!): Post!
  }
`;
