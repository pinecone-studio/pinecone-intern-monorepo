import gql from 'graphql-tag';

export const courseSchema = gql`
  scalar Date
  type Query {
    getCourses: [Course!]!
    getCourseById(id: ID!): Course!
  }
  type Course {
    id: ID
    title: String
    description: String
    thumbnail: String
    position: Int
    status: String
    createdAt: Date
  }
  input CourseInput {
    title: String
    description: String
    thumbnail: String
    status: String
  }
  type Mutation {
    updateCourse(id: ID!, courseInput: CourseInput!): Course!
    updateCourseStatus(id: ID!): Course!
    createCourse(courseInput: CourseInput!): Course!
  }
`;
