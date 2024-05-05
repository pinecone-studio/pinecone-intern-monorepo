import { gql } from 'graphql-tag';

export const EmployeeTypeDefs = gql`
  scalar Date
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    department: ID
    jobTitle: [String]
    ladderLevel: String
  }
  type Query {
    getEmployeeId(id:ID!,department:String):[Employee]!
  }
`;