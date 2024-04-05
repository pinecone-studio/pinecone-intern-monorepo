import { Schema, model } from 'mongoose';

export type Employee = {
  id: Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  jobTitle: [string];
  ladderLevel: string;
  salary: number;
  bankname: string;
  bankAccountNumber: string;
  bankAccountHolderNumber: string;
  dateOfEmployment: Date;
  dateOfReleased: Date;
  employmentStatus: string;
  gender: string;
  dateOfBirth: Date;
  registrationNumber: string;
  phone: string;
  hobby: [string];
  homeAddress: string;
  numberOfFamilyMembers: number;
  maritalStatus: string;
  relative: [{ id: Schema.Types.ObjectId; firstname: string; lastname: string; phone: string; dependency: string; isEmergency: boolean }];
};

const EmployeeSchema = new Schema<Employee>({
  id: Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  email: String,
  department: String,
  jobTitle: [String],
  ladderLevel: String,
  salary: Number,
  bankname: String,
  bankAccountNumber: String,
  bankAccountHolderNumber: String,
  dateOfEmployment: Date,
  dateOfReleased: Date,
  employmentStatus: String,
  gender: String,
  dateOfBirth: Date,
  registrationNumber: String,
  phone: String,
  hobby: [String],
  homeAddress: String,
  numberOfFamilyMembers: Number,
  maritalStatus: String,
  relative: [{ id: { type: Schema.Types.ObjectId, ref: 'Employee', required: false }, firstname: String, lastname: String, phone: String, dependency: String, isEmergency: Boolean }],
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
