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
  enum ApplicantStatus {
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
    status: ApplicantStatus
  }
  input UpdateApplicantInput {
    firstname: String
    lastname: String
    email: String
    phone: String
    cv: String
    status: ApplicantStatus
  }
  type Query {
    getApplicant: [Applicant!]!
    getApplicantById(applicantId: ID!): Applicant
    getApplicantWithLimit(offset: Int!, limit: Int!): [Applicant!]!
  }
  type Mutation {
    deleteApplicant(id: ID!): Applicant!
    createApplicant(createApplicantInput: CreateApplicantInput!): Applicant!
    updateApplicant(id: ID!, input: UpdateApplicantInput!): Applicant!
  }
`;
