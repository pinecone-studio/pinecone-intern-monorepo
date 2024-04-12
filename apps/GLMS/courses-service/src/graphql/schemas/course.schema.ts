import { gql } from 'graphql-tag';

export const courseSchema = gql`
  scalar Date

  type Query {
    getCourses: [Course!]!
    getCourseById(_id: ID!): Course
  }

  type Course {
    _id: ID
    title: String
    thumbnail: String
    position: Int
    createdAt: Date
  }

  type Mutation {
    createCourse(title: String!, thumbnail: String!, position: Int): Course!
    updateCourse(_id: ID!, title: String!, thumbnail: String!): Course
    deleteCourse(_id: String!): Course
  }
`;
