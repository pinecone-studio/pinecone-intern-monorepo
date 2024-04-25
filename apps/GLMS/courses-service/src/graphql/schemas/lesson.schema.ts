import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date
  type Query {
    getLessons: [Lesson!]!
    getLessonById(id: ID!): Lesson!
  }
  type Lesson {
    id: ID
    title: String
    thumbnail: String
    position: Int
    createdAt: Date
    sections: [Section]
  }
  input LessonInput {
    title: String
    thumbnail: String
    position: Int
  }

  type Mutation {
    createLesson(lessonInput: LessonInput!): Lesson!
    updateLesson(id: ID!, sectionIds: [ID], title: String!, thumbnail: String!, position: Int!): Lesson!
  }
`;
