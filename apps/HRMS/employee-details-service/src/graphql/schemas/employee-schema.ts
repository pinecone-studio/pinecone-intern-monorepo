import gql from 'graphql-tag';

export const employeeDetailsSchema = gql`
  scalar Date

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

  type Employee {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    imageURL: String
    department: Department!
    jobTitle: [String]!
    ladderLevel: String
    salary: String!
    bankName: String
    bankAccountNumber: String
    bankAccountHolderName: String
    dateOfEmployment: Date!
    dateOfReleased: Date
    employmentStatus: EmploymentStatus!
    personalInformation: PersonalInformation
    familyInformation: FamilyInformation
  }

  input CreateEmployeeInput {
    firstname: String!
    lastname: String!
    email: String!
    imageURL: String
    department: Department!
    jobTitle: [String]!
    ladderLevel: String
    salary: String!
    dateOfEmployment: Date!
    employmentStatus: EmploymentStatus!
  }

  input UpdateEmployeeInput {
    id: ID!
    email: String
    department: Department
    jobTitle: [String]
    ladderLevel: String
    salary: String!
    bankName: String
    bankAccountNumber: String
    dateOfReleased: Date
    employmentStatus: EmploymentStatus
  }

  type PersonalInformation {
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    phone: String
    hobby: [String]
  }

  input UpdatePersonalInformationInput {
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
    relatives: [Dependent]
  }

  input UpdateFamilyInformationInput {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relatives: [UpdateDependentInput]
  }

  type Dependent {
    id: ID!
    firstname: String!
    lastname: String!
    phone: String
    dependency: String
  }

  input UpdateDependentInput {
    id: ID!
    firstname: String
    lastname: String
    phone: String
    dependency: String
  }

  input PaginationInput {
    limit: Int!
    page: Int!
  }

  type PaginateReturn {
    totalEmployee: Int!
    employees: [Employee]!
  }
  input EmployeeDetailsFilterInput {
    searchedValue: String
    employmentStatus: EmploymentStatus
    jobTitle: String
  }
  type Query {
    getEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee!
    searchByEmploymentStatus(status: EmploymentStatus!): [Employee]
    filterByJobTitle(jobTitle: String!): [Employee]
    getEmployeeByPaginate(PaginationInput: PaginationInput!): PaginateReturn!
    getEmployeeByPaginate(filterInput: EmployeeDetailsFilterInput!, PaginationInput: PaginationInput!): PaginateReturn!
  }
  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee!

    addPersonalInformation(employeeId: ID!, input: UpdatePersonalInformationInput!): PersonalInformation!
    updatePersonalInformation(employeeId: ID!, input: UpdatePersonalInformationInput!): PersonalInformation!

    addFamilyInformation(employeeId: ID!, input: UpdateFamilyInformationInput!): FamilyInformation!
    updateFamilyInformation(employeeId: ID!, input: UpdateFamilyInformationInput!): FamilyInformation!
  }
`;
