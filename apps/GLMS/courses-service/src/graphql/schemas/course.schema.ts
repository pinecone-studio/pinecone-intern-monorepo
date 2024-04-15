import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date

  type Query {
    getLessons: [Lessons!]!
    getLessonById(_id: ID!): Lessons
  }

  type Lessons {
    _id: ID
    title: String
    thumbnail: String
    position: Int
    createdAt: Date
  }
  type Mutation {
    createLessons(title: String!, thumbnail: String!, position: Int): Lessons!
    updateLessons(_id: ID!, title: String!, thumbnail: String!): Lessons
    deleteLessons(_id: String!): Lessons
  }
`;
