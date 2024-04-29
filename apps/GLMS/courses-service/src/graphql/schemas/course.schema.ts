import gql from 'graphql-tag';

export const courseSchema = gql`
  scalar Date
  type Query {
    getCourses:[Course!]!
    getCourseById(id: ID!): Course!
  }
  type Course {
    id: ID
    title: String
    description: String
    thumbnail: String
    position: Int
    createdAt: Date
  }
  input CourseInput {
    title: String
    description: String
    thumbnail: String
  }
  type Mutation {
    createCourse(courseInput: CourseInput!): Course!
  }
`;
