import { gql } from 'graphql-tag';
export const sectionSchema = gql`
  type Query {
    getSections: [Section!]!
    getSectionById(id: ID!): Section!
  }
  type Section {
    id: ID
    title: String
    description: String
    contentImage: String
    posted: Boolean
    createdAt: Date
  }
  input SectionInput {
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
