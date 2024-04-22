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
  input SectionIds{
    sectionIds:[ID]
  }
  input LessonInput {
    title: String
    thumbnail: String
    position: Int
    sections: SectionIds
  }
  type Mutation {
    createLesson(LessonInput: LessonInput!): Lesson!
  }
`;
