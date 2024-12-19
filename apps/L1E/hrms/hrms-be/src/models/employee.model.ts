import { Schema, model, models } from 'mongoose';
/* eslint-disable no-unused-vars */
export enum EmployeeStatus {
  Lead = 'Lead',
  Employee = 'Employee',
}
/* eslint-enable no-unused-vars */
export type Employee = {
  _id: string;
  email: string;
  jobTitle: string;
  username: string;
  adminStatus: boolean;
  remoteLimit: number;
  paidLeaveLimit: number;
  freeLimit: number;
  employeeStatus: EmployeeStatus;
  updatedAt: string;
  createdAt: string;
};

const EmployeeSchema = new Schema<Employee>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    adminStatus: {
      type: Boolean,
      default: false,
    },
    remoteLimit: {
      type: Number,
    },
    paidLeaveLimit: {
      type: Number,
    },
    freeLimit: {
      type: Number,
    },
    employeeStatus: {
      type: String,
      enum: Object.values(EmployeeStatus),
      required: true,
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
export const EmployeeModel = models.Employee || model<Employee>('Employee', EmployeeSchema);
