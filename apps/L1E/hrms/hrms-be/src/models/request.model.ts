import { Schema, model, models } from 'mongoose';
/* eslint-disable no-unused-vars */
export enum RequestStatus {
  FREE = 'FREE',
  PAID_LEAVE = 'PAID_LEAVE',
  REMOTE = 'REMOTE',
}
export enum RequestType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
/* eslint-enable no-unused-vars */
export type Request = {
  _id: string;
  employeeId: Schema.Types.ObjectId;
  leadEmployeeId: Schema.Types.ObjectId;
  requestStatus: RequestStatus;
  selectedDay: string;
  requestType: RequestType;
  reason: string;
  reasonRefuse: string;
  startTime: string;
  endTime: string;
  updatedAt: string;
  createdAt: string;
};
const RequestSchema = new Schema<Request>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    leadEmployeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    requestStatus: {
      type: String,
      enum: Object.values(RequestStatus),
    },
    requestType: {
      type: String,
      enum: Object.values(RequestType),
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    reasonRefuse: {
      type: String,
      default: '',
    },
    selectedDay: {
      type: String,
    },
    startTime: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    updatedAt: {
      type: String,
    },
    createdAt: {
      type: String,
    },
  },
  { timestamps: true }
);
export const RequestModel = models.Request || model<Request>('Request', RequestSchema);
