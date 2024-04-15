import { gql } from 'graphql-tag';
export const contentSchema = gql`
scalar Date
  type Query {
    getContents: [Content!]!
  }

  type Content {
    _id: ID
    title: String
    description: String
    contentImage:String
    createdAt:Date
  }
  type Mutation {
    createContents(title: String!,  description: String!, contentImage:String!): Content!
  }
`;
