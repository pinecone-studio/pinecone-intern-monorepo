import { gql } from 'apollo-server-cloud-functions';

export const familyTypeDefs = gql`
  scalar Date

  type FamilyInformation {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relative: [Dependent]
  }
  type Dependent {
    id: ID
    firstname: String
    lastname: String
    phone: String
    dependency: String
  }

  enum MaritalStatus {
    SINGLE
    MARRIED
    DIVORCED
    WIDOWED
  }

  input UpdateFamilyInformationInput {
    homeAddress: String
    numberOfFamilyMembers: Int
    maritalStatus: MaritalStatus
    relative: [Dependent]
  }
`;
