import { gql } from 'graphql-tag';

export const courseSchema = gql`
  scalar Date

  type Query {
    getLessons: [Lesson!]!
  }

  type Lesson {
    _id: ID
    title: String
    thumbnail: String
    position: Int
    createdAt: Date
  }

  type Mutation {
    createLesson(title: String!, thumbnail: String!, position: Int): Lesson!
    deleteLesson(_id: String!): Lesson
  }
`;
