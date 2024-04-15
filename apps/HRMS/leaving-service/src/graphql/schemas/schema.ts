import { gql } from 'graphql-tag';

export const LeaveRequestTypeDefs = gql`
  scalar Date

  enum LeaveType {
    SHIT_HAPPENED
    REMOTE
    MEDICAL
    FAMILY_EMERGENCY
    OTHERS
  }

  enum RequestStatus {
    PENDING
    APPROVED
    DECLINED
  }

  input LeaveRequestInput {
    employeeId: ID
    date: Date
    startHour: Date
    totalHour: Int
    description: String!
    declinedReasoning: String
    leaveType: LeaveType!
    supervisor: String
  }

  type LeaveRequest {
    _id: ID!
    leaveType: LeaveType!
    employeeId: ID!
    startHour: Date
    totalHour: Int
    supervisor: String
    status: RequestStatus!
    description: String!
    declinedReasoning: String
    createdAt: Date
    decidedAt: Date
  }

  type Query {
    getRequests: [LeaveRequest!]!
    getRequestById(_id: ID!): LeaveRequest
  }

  type Mutation {
    createLeaveRequest(requestInput: LeaveRequestInput!): LeaveRequest
    deleteLeaveRequest(_id: ID!): LeaveRequest
    approveRequest(_id: ID!): LeaveRequest!
    declineRequest(_id: ID!): LeaveRequest!
  }
`;
