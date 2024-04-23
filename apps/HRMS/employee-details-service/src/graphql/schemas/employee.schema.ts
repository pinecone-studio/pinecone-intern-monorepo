/* eslint-disable no-secrets/no-secrets */
import { gql } from 'graphql-tag';

export const employeeDetailsSchema = gql`
  scalar Date

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    department: ID
    jobTitle: [String]
    ladderLevel: String
    salary: Float
    bankName: String
    bankAccountNumber: String
    bankAccountHolderName: String
    dateOfEmployment: Date
    dateOfReleased: Date
    employmentStatus: EmploymentStatus
    personalInformation: PersonalInformation
    familyInformation: FamilyInformation
  }

  type PersonalInformation {
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    phone: String
    hobby: [String]
  }

  type FamilyInformation {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relative: [Dependent]
  }

  type Dependent {
    id: ID!
    firstName: String
    lastName: String
    phone: String
    dependency: String
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
    department: ID
    jobTitle: [String]
    ladderLevel: String
    salary: Float
    dateOfEmployment: Date
    employmentStatus: EmploymentStatus
  }

  input UpdateEmployeeInput {
    id: ID
    email: String
    department: ID
    jobTitle: [String]
    ladderLevel: Int
    salary: Float
    bankName: String
    bankAccountNumber: Float
    dateOfReleased: Date
    employmentStatus: EmploymentStatus
  }

  input UpdatePersonalInformationInput {
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    phone: String
    hobby: [String]
  }

  input UpdateFamilyInformationInput {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relative: [Department]
  }

  input CreateDependetInput {
    firstName: String
    lastName: String
    phone: String
    dependency: String
  }

  input UpdateDependentInput {
    firstName: String
    lastName: String
    phone: String
    dependency: String
  }

  type Query {
    getDependent(id: ID!): Dependent!
    getAllEmployee: [Employee]
    getAllDependents: [Dependent!]
    getEmployee(id: ID): Employee
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    createDependent(input: CreateDependetInput): Dependent!
    deletedDependent(id: ID!): Dependent!
    deleteEmployee(id: ID!): Employee!
    updatedDependent(id: ID!, input: UpdateDependentInput!): Dependent!
  }
`;
