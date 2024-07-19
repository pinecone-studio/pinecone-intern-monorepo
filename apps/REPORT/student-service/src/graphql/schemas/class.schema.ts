import gql from 'graphql-tag';

export const classSchema = gql`
  scalar Date
  type Class {
    _id: ID
    name: String!
    teachers: [String]
    endDate: String!
    startDate: String!
    classType: ClassType!
  }
  enum ClassType {
    CODING
    DESIGN
  }

  input CreateClassInput {
    name: String!
    teachers: [String]!
    endDate: String!
    startDate: String!
    classType: String!
  }
  input UpdateClassInput {
    _id: ID!
    name: String
    teachers: [String]
    endDate: String
    startDate: String
    classType: String
  }
  type Query {
    getClasses(search: String): [Class!]!
    getClassById(classId: ID!): Class!
  }
  type Mutation {
    createClass(input: CreateClassInput!): Class!
    updateClass(input: UpdateClassInput!): Class!
    deleteClass(classId: ID!): Class!
  }
`;
