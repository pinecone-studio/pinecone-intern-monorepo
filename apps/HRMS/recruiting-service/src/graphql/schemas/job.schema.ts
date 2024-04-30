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
    DRAFT
    PUBLISHED
    CLOSED
  }

  input CreateJobInput {
    title: String!
    description: String!
    requirements: RequirementInput!
    minSalary: String!
    maxSalary: String!
    status: JobStatus!
  }

  input RequirementInput {
    skill: String
    education: String
    language: String
    qualification: String
    workExperience: String
    others: String
  }

  type Query {
    getJobs: [Job!]!
    getJobById(jobId: ID!): Job
  }

  type Mutation {
    deleteJob(id: ID!): Job!
    createJobRecruit(input: CreateJobInput!): Job!
  }
`;
