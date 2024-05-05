import { gql } from 'graphql-tag';
export const sectionSchema = gql`
   type Query {
    getSections: [Section!]!
  }
  type Section {
    id: ID
    title: String
    description: String
    contentImage: String
    createdAt:Date
  }
  input SectionInput {
    title: String
    description: String
    contentImage: String
  }
  type Mutation {
    createSection(sectionInput:SectionInput!): Section!
    updateSection(id: ID!, sectionInput:SectionInput!): Section!
    deleteSection(id:ID!):Section!
  }
`;
