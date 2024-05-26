import { gql } from '@apollo/client';

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJobRecruit(input: $input) {
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
    }
  }
`;
