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

  type Query {
    getJobs: [Job!]!
    getJobById(jobId: ID!): Job
  }

  type Mutation {
    deleteJob(id: ID!): Job!
  }
`;
