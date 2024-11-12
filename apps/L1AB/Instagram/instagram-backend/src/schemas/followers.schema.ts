import gql from 'graphql-tag';

export const typeDefs = gql`
  type Followers {
    _id: ID!
    userId: ID!
    followerId: ID!
    followingId: ID!
    createdAt: Date!
  }
`;
