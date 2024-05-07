/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const employeeDetailsSchema = gql`
  scalar Date
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    imageUrl: String
    department: Department
    jobTitle: String
    ladderLevel: String
    salary: Float
    bankName: String
    bankAccountNumber: String
    bankAccountHolderName: String
    dateOfEmployment: Date
    dateOfReleased: Date
    employmentStatus: EmploymentStatus
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    hobby: [String]
    relative: [Dependent!]!
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  enum MaritalStatus {
    SINGLE
    MARRIED
    DIVORCED
    WIDOWED
  }

  enum EmploymentStatus {
    FULL_TIME
    PART_TIME
    CONTRACTOR
    TEMPORARY
    ARCHIVE
  }

  enum Department {
    SOFTWARE
    DESIGN
    MARKETING
    BACK_OFFICE
  }

  input CreateEmployeeInput {
    firstName: String
    lastName: String
    email: String
    imageUrl: String
    department: Department
    jobTitle: String
    ladderLevel: String
    salary: Float
    dateOfEmployment: Date
    employmentStatus: EmploymentStatus
  }

  input UpdateEmployeeInput {
    id: ID
    email: String
    department: Department
    jobTitle: [String]
    ladderLevel: Int
    phone: String
    salary: Float
    bankName: String
    bankAccountNumber: Float
    dateOfReleased: Date
    employmentStatus: EmploymentStatus
  }

  input UpdatePersonalInformationInput {
    id: ID
    firstName: String
    phone: String
    email: String
    jobTitle: String
    imageUrl: String
  }

  input UpdateFamilyInformationInput {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relative: [Department]
  }

  input PaginationInput {
    limit: Int!
    page: Int!
  }

  type paginateReturn {
    totalEmployees: Int!
    employees: [Employee]!
  }

  input employeeDetailsfilterInput {
    searchedValue: String
  }

  type Query {
    getAllEmployee: [Employee]
    getEmployee(id: ID): Employee
    getEmployeeRequest(id: ID!): [Employee]!
    getEmployeesByPaginate(paginationInput: PaginationInput!): paginateReturn!
    getEmployeesByPaginate(employeeDetailsfilterInput: employeeDetailsfilterInput!, paginationInput: PaginationInput!): paginateReturn!
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee!
    personalUpdate(id: ID!, input: UpdatePersonalInformationInput!): Employee!
  }
`;
