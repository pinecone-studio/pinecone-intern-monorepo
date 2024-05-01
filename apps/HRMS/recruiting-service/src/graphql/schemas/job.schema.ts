import { gql } from 'graphql-tag';

export const Job = gql`
  type Job {
    id: ID
    title: String
    description: String
    requirements: Requirement!
    minSalary: String
    maxSalary: String
    dueDate: String!
    createdAt: String!
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

  input CreateJobInput {
    title: String!
    description: String!
    requirements: RequirementInput!
    minSalary: String!
    maxSalary: String!
    dueDate: String!
    createdAt: String!
    status: JobStatus!
  }
  input UpdateJobInput {
    title: String
    description: String
    requirements: RequirementInput
    minSalary: String
    maxSalary: String
    dueDate: String
    createdAt: String
    status: JobStatus
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
    createJobRecruit(input: CreateJobInput!): Job!
    updateJob(id: ID!, input: UpdateJobInput!): Job!
  }
`;
