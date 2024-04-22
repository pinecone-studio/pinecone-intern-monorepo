import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date
  type Query {
    getLessons: [Lesson!]!
  }
  type Lesson {
    id: ID
    title: String
    thumbnail: String
    position: Int
    createdAt: Date
    sections: [Section]
  }
  input sectionIds{
    sectionIds:[ID]
  }
  input LessonInput {
    title: String
    thumbnail: String
    position: Int
  }
  type Mutation {
    createLesson(lessonInput:LessonInput!): Lesson!
  }
`;
