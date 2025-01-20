import gql from 'graphql-tag';

export const typeDefs = gql`
  enum EmployeeStatus {
    Lead
    Employee
  }

  type Token {
    token: String
    employee: Employee
  }

  type Employee {
    _id: ID!
    email: String!
    jobTitle: String!
    username: String!
    adminStatus: Boolean!
    remoteLimit: Int!
    paidLeaveLimit: Int!
    freeLimit: Int!
    employeeStatus: EmployeeStatus!
    otpToken: String
    otpUpdatedAt: String
    updatedAt: String
    createdAt: String
  }

  input EmployeeInput {
    email: String!
    jobTitle: String!
    username: String!
    employeeStatus: EmployeeStatus!
    createdAt: String
  }

  input EmployeeUpdateInput {
    email: String
    jobTitle: String
    username: String
    employeeStatus: EmployeeStatus
  }

  type Query {
    getEmployeeById(id: ID!): Employee
    getEmployees(input: String): [Employee]
    getAllEmployees: [Employee]
    getEmployeeByEmail(email: String): Employee
    getEmployeeByOtp(email: String, otpToken: String): Token
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!
    deleteEmployee(id: ID!): Boolean
  }
`;
