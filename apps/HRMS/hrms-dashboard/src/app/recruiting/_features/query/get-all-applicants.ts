import { gql } from '@apollo/client';

export const GET_ALL_APPLICANTS = gql`
  query {
    getApplicants {
      id
      firstname
      lastname
      email
      status
    }
  }
`;
