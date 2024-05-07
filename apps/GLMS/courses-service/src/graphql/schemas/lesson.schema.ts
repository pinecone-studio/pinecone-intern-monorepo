import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date
  type Query {
    getLessons: [Lesson!]!
<<<<<<< HEAD
    getLessonById(courseId: String!): [Lesson!]
=======
    getLessonById(courseId: String!): Lesson!
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
  }
  type Lesson {
    id: ID
    title: String
    thumbnail: String
    position: Int
    courseId: String
    createdAt: Date
    sections: [Section]
  }
  input LessonInput {
    title: String
    thumbnail: String
    position: Int
    courseId: String
  }

  type Mutation {
    createLesson(lessonInput: LessonInput!): Lesson!
    # updateLesson(id: ID!, sectionIds: [ID], title: String!, thumbnail: String!, position: Int!): Lesson!
  }
`;
