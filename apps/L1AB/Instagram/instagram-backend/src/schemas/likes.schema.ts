import gql from 'graphql-tag';

export const typeDefs = gql`
  type Likes {
    _id: ID!
    userId: ID!
    postId: ID!
    createdAt: Date!
  }
`;
