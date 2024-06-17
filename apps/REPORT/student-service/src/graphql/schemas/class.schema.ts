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
  
  type Query {
    getClasses: [Class]
  }
`;
