import { gql } from '@apollo/client';

export const GET_ALL_JOBS = gql`
  query {
    getJobs {
      id
      title
      dueDate
      createdAt
      status
    }
  }
`;
