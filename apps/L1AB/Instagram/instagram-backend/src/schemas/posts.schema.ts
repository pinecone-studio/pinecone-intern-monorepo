import gql from 'graphql-tag';

export const typeDefs = gql`
  type Posts {
    _id: ID!
    userId: ID!
    images: [String!]!
    caption: String!
    likeCounts: Int!
    createdAt: Date!
    updatedAt: Date!
  }
`;
