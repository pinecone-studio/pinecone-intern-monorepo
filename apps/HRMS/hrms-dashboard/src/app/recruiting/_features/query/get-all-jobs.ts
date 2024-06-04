import { gql } from '@apollo/client';

export const GET_JOBS = gql`
  query GetJobsWithLimit($offset: Int!, $limit: Int!) {
    getJobsWithLimit(offset: $offset, limit: $limit) {
      id
      title
      description
      requirements {
        others
      }
      minSalary
      maxSalary
      dueDate
      createdAt
      status
      applicant
    }
  }
`;
