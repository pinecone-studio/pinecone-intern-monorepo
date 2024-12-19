import gql from 'graphql-tag';

export const typeDefs = gql`
  enum EmployeeStatus {
    Lead
    Employee
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
    getEmployees(page: Int, limit: Int): [Employee]
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;
