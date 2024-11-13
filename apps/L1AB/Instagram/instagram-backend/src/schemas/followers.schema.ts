import gql from 'graphql-tag';

export const typeDefs = gql`
  type Followers {
    _id: ID!
    followerId: ID!
    followeeId: ID!
    createdAt: Date!
  }
`;
