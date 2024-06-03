import { gql } from '@apollo/client';

export const UPDATE_JOB = gql`
  mutation ($updateJobId: ID!, $input: UpdateJobInput!) {
    updateJob(id: $updateJobId, input: $input) {
      title
      description
      requirements {
        others
      }
      minSalary
      maxSalary
      status
      createdAt
      dueDate
    }
  }
`;
