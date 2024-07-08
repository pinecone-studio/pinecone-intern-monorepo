import gql from 'graphql-tag';

export const studentsSchema = gql`
  scalar Date
  type Student {
    _id: ID
    firstName: String!
    lastName: String!
    studentCode: String!
    profileImgUrl: String!
    classId: String!
    active: StudentStatus
    phoneNumber: String!
    email: String!
  }
  input CreateStudentInput {
    firstName: String!
    lastName: String!
    studentCode: String!
    profileImgUrl: String!
    classId: String!
    phoneNumber: String!
    email: String!
    active: String!
  }
  input deleteStudentInput {
    studentId: String!
  }
  input UpdateStudentInput {
    _id: ID!
    firstName: String!
    lastName: String!
    studentCode: String!
    profileImgUrl: String!
    classId: String!
    phoneNumber: String!
    email: String!
    active: String!
  }

  enum StudentStatus {
    ACTIVE
    PASSIVE
  }
  type Query {
    getStudentsByClassId(classId: String!): [Student!]
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    deleteStudent(input: deleteStudentInput!): ID!
    updateStudent(updateInput: UpdateStudentInput!): ID!
  }
`;
