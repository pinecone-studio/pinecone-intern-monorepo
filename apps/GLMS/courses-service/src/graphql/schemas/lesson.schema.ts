import { gql } from 'graphql-tag';

export const lessonSchema = gql`
  scalar Date
  type Query {
    getLessons: [Lesson!]!
  }
  type Section {
    id: ID
    title: String
    contentImage: String
    description: String
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
    sections: [ID]
  }
  type Mutation {
    createLesson(LessonInput: LessonInput!): Lesson!
  }
`;
