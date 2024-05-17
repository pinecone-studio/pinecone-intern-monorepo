import { gql } from 'graphql-tag';

export const Applicant = gql`
  type Applicant {
    id: ID
    firstname: String
    lastname: String
    email: String!
    phone: String
    cv: String
    status: String!
  }
  enum JobStatus {
    PENDING
    SCHEDULED
    INTERVIEW_STAGE
    PASSED
    REJECTED
  }
  input CreateApplicantInput {
    firstname: String
    lastname: String
    email: String
    phone: String
    cv: String
    status: JobStatus
  }
  type Query {
    getApplicant: [Applicant!]!
    getApplicantById(applicantId: ID!): Applicant
    getApplicantWithLimit(offset: Int!, limit: Int!): [Applicant!]!
  }
  type Mutation {
    createApplicant(createApplicantInput: CreateApplicantInput!): Applicant!
  }
`;
