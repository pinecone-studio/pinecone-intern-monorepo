import gql from 'graphql-tag';

export const classSchema = gql`
  scalar Date

  enum ClassType {
    CODING
    DESIGN
  }

  type Class {
    _id: ID!
    name: String!
    startDate: String!
    endDate: String!
    classType: ClassType!
    teachers: [String!]!
  }

  input CreateClassInput {
    name: String!
    startDate: String!
    classType: ClassType!
    teachers: [String!]!
  }
  type Query {
    getClasses: [Class]
  }
`;
