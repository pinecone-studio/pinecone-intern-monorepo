import { gql } from 'apollo-server-cloud-functions';

export const assessmentTypeDefs = gql`
  scalar Date

  type Assessment {
    _id: ID
    title: String!
    content: String!
    position: Int
    createdAt: Date
    updatedAt: Date
  }

  input CreateAssessmentInput {
    title: String!
    content: String!
    position: Int
  }

  input UpdateAssessmentInput {
    title: String!
    content: String!
    position: Int
    updatedAt: Date
  }

  type Query {
    getAssessmentDetails(_id: String!): Assessment
    getAssessments: [Assessment]
  }

  type Mutation {
    createAssessment(createAssessmentInput: CreateAssessmentInput!): ID!
    updateAssessment(_id: String!, updateAssessmentInput: UpdateAssessmentInput): Assessment
    deleteAssessment(_id: String!): Assessment
  }
`;
