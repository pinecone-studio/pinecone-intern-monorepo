import { gql } from '@apollo/client';

export const GET_APPLICANTS_LIMIT = gql`
  query GetApplicantsWithLimit($offset: Int!, $limit: Int!) {
    getApplicantWithLimit(offset: $offset, limit: $limit) {
      id
      firstname
      lastname
      status
      email
    }
  }
`;
