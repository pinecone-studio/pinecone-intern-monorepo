import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date
  type Query {
    getLessons: [Lesson!]!
    getLessonById(courseId: String!): [Lesson!]
    getSectionOfLessonById(id: ID!): [Lesson!]
    getLessonByInId(id: ID!): Lesson!
  }
  type Lesson {
    id: ID
    title: String
    thumbnail: String
    position: Int
    courseId: String
    createdAt: Date
  }
  input LessonInput {
    title: String
    thumbnail: String
    position: Int
    courseId: String
  }

  type Mutation {
    createLesson(lessonInput: LessonInput!): Lesson!
    updateLesson(id: ID!, sectionIds: [ID]): Lesson!
    deleteLesson(id: ID!): Lesson!
    updateLessonByInput(id: ID!, lessonInput: LessonInput!): Lesson!
  }
`;
