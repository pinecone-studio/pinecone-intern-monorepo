import { gql } from 'graphql-tag';

export const leaveReqLeavingSchema = gql`
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

  scalar Date

  type LeaveRequest {
    _id: ID!
    leaveType: LeaveType!
    employeeId: String!
    # date: Date!
    # startHour: Date!
    # totalHour: Int!
    # supervisor: String!
    # status: RequestStatus
    # declinedReasoning: String
    # description: String
    # createdAt: Date!
    # decidedAt: Date!
  }
  type Query {
    # employees:[Employee]
    # getRequestsMe(employeeId: ID): [LeaveRequest]
    getLeaveRequests: [LeaveRequest]
    getLeaveRequestById(_id: ID): LeaveRequest
    # getLeaveRequestsForSupervisor(supervisorFilterInput: SupervisorFilterInput): [LeaveRequest]
  }

  # ******************** Mutations ********************

  input LeaveRequestInput {
    employeeId: ID
    # supervisor: String
    # date: Date
    # startHour: Date
    # totalHour: Int
    # description: String
    type: LeaveType
  }
  type Mutation {
    createLeaveRequest(requestInput: LeaveRequestInput): LeaveRequest
    # editLeaveRequest(id: ID!, edit: EditRequestInput): LeaveRequest
    # deleteLeaveReques(id: ID!): [LeaveRequest]
    # approveLeaveRequest(leadInput: LeavingSupervisorInput): String
    # declineLeaveRequest(leadInput: LeavingSupervisorInput): String
  }
`;
