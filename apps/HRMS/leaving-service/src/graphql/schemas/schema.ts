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
  enum DurationType{
    Hour
    Day
  }

  input LeaveRequestInput {
    employeeId: String
    startDateString: Date
    endDateString: Date
    description: String!
    leaveType: LeaveType!
    superVisor: String
    durationType: DurationType!
    declinedReasoning: String
    email: String!
    substitute: String
  }

  type LeaveRequest {
    _id: ID
    employeeId: String
    startDate: Date
    description: String!
    leaveType: LeaveType!
    superVisor: String
    durationType: DurationType!
    status: RequestStatus!
    declinedReasoning: String
    startHour: Int
    endHour: Int
    totalHour: Int!
  }

  type Query {
    getRequests: [LeaveRequest!]!
    getRequestById(_id: ID!): LeaveRequest
    getRequestByMonth(startDate: Date): [LeaveRequest]!
  }

  type Mutation {
    createLeaveRequestHours(requestInput: LeaveRequestInput!): LeaveRequest!
    createLeaveRequestDays(requestInput: LeaveRequestInput!): [LeaveRequest]!
    deleteLeaveRequest(_id: ID!): LeaveRequest
    approveRequest(_id: ID!): LeaveRequest!
    declineRequest(_id: ID!): LeaveRequest!
  }
`;