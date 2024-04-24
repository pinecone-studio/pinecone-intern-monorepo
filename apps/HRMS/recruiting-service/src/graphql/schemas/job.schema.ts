import { gql } from 'graphql-tag';

export const Job = gql`
  type Job {
    id: ID
    title: String
    description: String
    requirements: Requirement
    minSalary: String
    maxSalary: String
    status: JobStatus
    applicant: String
  }

  type Requirement {
    skill: String
    education: String
    language: String
    qualification: String
    workExperience: String
    others: String
  }

  enum JobStatus {
    DRAFTED
    PUBLISHED
    CLOSED
  }

  # input CreateJobInput {
  #   title: String!
  #   description: String!
  #   requirements: RequirementInput!
  #   minSalary: String!
  #   maxSalary: String!
  #   status: JobStatus!
  # }

  # input RequirementInput {
  #   skill: String
  #   education: String
  #   language: String
  #   qualification: String
  #   workExperience: String
  #   others: String
  # }

  # enum ApplicantStatus {
  #   PENDING
  #   SCHEDULED
  #   INTERVIEW_STAGE
  #   PASSED
  #   REJECTED
  # }

  #   input CreateApplicantInput {
  #     firstname: String!
  #     lastname: String!
  #     email: String!
  #     phone: String!
  #     cv: String!
  #   }

  # input UpdateJobInput {
  #   title: String!
  #   description: String!
  #   requirements: RequirementInput
  #   minSalary: String
  #   maxSalary: String
  # }

  #   input ChangeApplicantStatusInput {
  #     status: ApplicantStatus
  #   }

  #   input editTodoInput {
  #     title: String
  #   }

  type Query {
    getJobs: [Job!]!
    getJobById(jobId: ID!): Job
    # getApplicants(jobId: ID): [Applicant]
  }

  # type Mutation {
  # createJobRecruit(input: CreateJobInput): Job!
  #     createApplicant(input: CreateApplicantInput): Applicant!
  # updateJobRecruit(jobId: ID!, input: UpdateJobInput): Job!
  #     deleteJob(id: ID!): ID!
  #     changeApplicantsStatus(id: ID!, input: ChangeApplicantStatusInput): Applicant!
  #     publishJobAd(jobId: ID): Job!
  # }
  #
`;
