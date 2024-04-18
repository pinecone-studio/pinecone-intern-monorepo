import { gql } from 'graphql-tag';

export const jobSchema = gql`
  scalar Date
  type Job {
    id: ID!
    jobTitle: String!
    description: String
    requirements: [String!]
    minSalary: String
    maxSalary: String
    status: JobStatus!
    applicant: [ID]
  }

  type Applicant {
    userId: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    cv: String
    status: ApplicantStatus
  }

  input CreateJobInput {
    jobTitle: String!
    description: String!
    requirements: [String!]
    minSalary: String
    maxSalary: String
    status: JobStatus
  }

  input UpdateJobInput {
    jobTitle: String!
    description: String
    requirements: [String!]
    salary: Float
    minSalary: String
    maxSalary: String
  }

  input ChangeApplicantStatusInput {
    status: ApplicantStatus!
  }

  enum JobStatus {
    DRAFT
    PUBLISHED
    CLOSED
  }
  enum ApplicantStatus {
    PENDING
    SCHEDULED
    INTERVIEW_STAGE
    PASSED
    REJECTED
  }

  type Query {
    getJobList: [Job!]!
    getJobDetails(jobId: ID!): Job
    getApplicants(jobId: ID): [Applicant]
  }

  type Mutation {
    CreateJob(input: CreateJobInput!): Job!
    UpdateJob(input: UpdateJobInput!): Job!
    DeleteJob(id: ID!): ID!
    changeApplicantStatus(input: ChangeApplicantStatusInput): Applicant!
    publishJobAd(jobId: ID): Job!
  }
`;
