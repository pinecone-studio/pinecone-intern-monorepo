import { gql } from 'apollo-server-cloud-functions';

export const personalInformationTypeDefs = gql`
  scalar Date

  type PersonalInformation {
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    phone: String
    hobby: [String]
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  input UpdatePersonalInformationInput {
    gender: Gender
    dateOfBirth: Date
    registrationNumber: String
    phone: String
    hobby: [String]
  }

  type Mutation {
    addPersonalInformation(employeeId: ID, input: UpdatePersonalInformationInput): PersonalInformation!
    updatePersonalInformation(employeeId: ID, input: UpdatePersonalInformationInput): PersonalInformation!
  }
`;
