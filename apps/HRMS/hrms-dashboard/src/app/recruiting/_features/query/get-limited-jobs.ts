import { gql } from '@apollo/client';

export const GET_JOBS_LIMIT = gql`
  query GetJobsWithLimit($offset: Int!, $limit: Int!) {
    getJobsWithLimit(offset: $offset, limit: $limit) {
      id
      title
      dueDate
      createdAt
      status
    }
  }
`;
