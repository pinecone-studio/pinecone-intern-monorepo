import { gql } from 'graphql-tag';
export const contentSchema = gql`
  type Query {
    getContent: [Content!]!
  }

  type Content {
    _Id: ID
    title: String
    description: String
    LessonImage: String
  }
  type Mutation {
    createContent(title: String, description: String!, LessonImage: String!): Content!
  }
`;
