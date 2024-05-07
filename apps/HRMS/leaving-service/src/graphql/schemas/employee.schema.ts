import { gql } from 'graphql-tag';

export const EmployeeTypeDefs = gql`
  scalar Date
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    department: Department
    jobTitle: [String]
    ladderLevel: String
    phone: String
  }
  enum Department {
    SOFTWARE
    DESIGN
    MARKETING
    BACK_OFFICE
  }
  type Token {
    token: String!
    message: String!
  }
  input SignInInput {
    emailOrPhoneNumber: String!
  }
  type Mutation{
    signIn(input: SignInInput!): Token!
  }
`;