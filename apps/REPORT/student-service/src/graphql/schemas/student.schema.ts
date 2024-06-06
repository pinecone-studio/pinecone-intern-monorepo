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
    active: Boolean
  }
  input CreateStudentInput {
    firstName: String!
    lastName: String!
    studentCode: String!
    profileImgUrl: String!
    classId: String!
  }
  input deleteStudentInput {
    studentId: String!
  }

  type Query {
    getStudentsByClassId(classId: String!): [Student!]
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    deleteStudent(input: deleteStudentInput!): ID!
  }
`;
