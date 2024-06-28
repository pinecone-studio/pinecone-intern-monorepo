import { gql } from 'graphql-tag';

export const coursesTypeDefs = gql`
  scalar Date

  type Query {
    getCourse(_id: ID!): Course
    getCourses: [Course]
    getLessons(courseId: ID!): [Lesson]
    getLessonDetails(id: ID!): Lesson
  }

  type Mutation {
    createCourse(createInput: CreateCourseInput): Course
    updateCourse(updateInput: UpdateCourseInput): Course
    changeCoursesPosition(ids: [ID!]!): Boolean
    deleteCourse(id: ID!): Course

    createLesson(createInput: CreateLessonInput): Lesson
    updateLesson(updateInput: UpdateLessonInput): Lesson
    changeLessonsPosition(ids: [ID!]!): Boolean
    deleteLesson(id: ID!): Course
  }

  type Course {
    id: ID!
    title: String!
    thumbnail: String!
    content: String!
    position: Int
    createdAt: Date
  }

  input CreateCourseInput {
    title: String!
    thumbnail: String!
    content: String!
  }

  input UpdateCourseInput {
    id: ID!
    title: String
    thumbnail: String
    content: String
  }

  type Lesson {
    id: ID!
    courseId: ID!
    title: String!
    thumbnail: String!
    content: String!
    position: Int
    createdAt: Date
  }

  input CreateLessonInput {
    courseId: ID!
    title: String!
    thumbnail: String!
    content: String!
  }

  input UpdateLessonInput {
    id: ID!
    courseId: ID
    title: String
    thumbnail: String
    content: String
  }
`;
