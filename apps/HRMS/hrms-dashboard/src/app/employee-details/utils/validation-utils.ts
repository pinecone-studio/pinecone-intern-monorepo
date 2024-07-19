import { EmployeesInfoType } from '../_features/EmplyeeDetails';

interface ValidationErrors {
  email?: string;
}

export const isValidPersonalInfo = (values: EmployeesInfoType, errors: ValidationErrors) => {
  return !values.firstname || !values.lastname || !values.email || errors.email !== undefined;
};

export const isValidJobInfo = (values: EmployeesInfoType) => {
  return !values.department || !values.jobTitle || !values.salary || !values.employmentStatus;
};

export const isValidAdditionalInfo = (values: EmployeesInfoType) => {
  return !values.ladderLevel || !values.imageURL;
};
