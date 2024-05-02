import { gql } from 'graphql-tag';

export const EmployeeTypeDefs = gql`
  scalar Date

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    imageUrl: String
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

  type Query {
    getEmployeeId(id:ID!,department:String): [Employee]
    getEmployee:[Employee!]!
  }
`;