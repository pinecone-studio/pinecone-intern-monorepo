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
    content: [Content]
    position: Int
    createdAt: Date
  }

  type Content {
    title: String
    description: String
  }

  input ContentInput {
    title: String
    description: String
  }

  type Mutation {
    createCourse(content: [ContentInput]!, title: String!, thumbnail: String!, position: Int): Course!
    updateCourse(_id: ID!, title: String!, content: [ContentInput]!, thumbnail: String!): Course
    deleteCourse(_id: String!): Course
  }
`;
