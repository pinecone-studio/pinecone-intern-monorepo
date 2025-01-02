import gql from 'graphql-tag';

export const typeDefs = gql`
  type Swipe {
    _id: ID!
    swiperId: String!
    swipedId: String!
    like: Boolean!
    createdAt: String!
  }

  input SwipeInput {
    swiperId: String!
    swipedId: String!
    like: Boolean!
  }

  type Mutation {
    createSwipe(input: SwipeInput!): Swipe!
  }

  type Query {
    getSwipesByUser(userId: String!): [Swipe!]!
  }
`;
