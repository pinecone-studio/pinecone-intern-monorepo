import gql from 'graphql-tag';

export const OTPTypeDefs = gql`
  type otp {
    id: ID!
    user: User!
    otp: Int!
    createdAt: String
    updatedAt: String
  }
`;
