import { gql } from 'graphql-tag';
export const sectionSchema = gql`
  type Query {
    getSections: [Section!]!
    getSectionById(id: ID!): Section!
    getSectionByLessonId(lessonId: String!): [Section!]
  }
  type Section {
    id: ID
    lessonId: String
    title: String
    description: String
    contentImage: String
    posted: Boolean
    createdAt: Date
  }
  input SectionInput {
    lessonId: String
    title: String
    description: String
    contentImage: String
    posted: Boolean
  }
  type Mutation {
    createSection(sectionInput: SectionInput!): Section!
    updateSection(id: ID!, sectionInput: SectionInput!): Section!
    deleteSection(id: ID!): Section!
  }
`;
