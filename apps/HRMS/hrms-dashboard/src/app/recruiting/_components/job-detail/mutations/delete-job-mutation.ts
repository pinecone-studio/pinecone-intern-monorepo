import { gql } from '@apollo/client';

export const DELETE_JOB = gql`
  mutation DeleteJob($deleteJobId: ID!) {
    deleteJob(id: $deleteJobId) {
      id
      title
    }
  }
`;
