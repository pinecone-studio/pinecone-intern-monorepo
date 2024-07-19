import { EmployeesInfoType } from '../../src/app/employee-details/_features/EmplyeeDetails';
import { isValidPersonalInfo, isValidJobInfo, isValidAdditionalInfo } from '../../src/app/employee-details/utils/validation-utils';

describe('Employee Info Validation', () => {
  let mockEmployeeInfo: EmployeesInfoType;
  let mockErrors: { email?: string };

  beforeEach(() => {
    mockEmployeeInfo = {
      firstname: '',
      lastname: '',
      email: '',
      department: '',
      jobTitle: [''],
      salary: '',
      employmentStatus: '',
      ladderLevel: '',
      imageURL: '',
      dateOfEmployment: new Date(),
    };
    mockErrors = {};
  });

  describe('isValidPersonalInfo', () => {
    it('should return true if any personal info is missing', () => {
      expect(isValidPersonalInfo(mockEmployeeInfo, mockErrors)).toBe(true);
    });

    it('should return true if email error exists', () => {
      mockEmployeeInfo.firstname = 'John';
      mockEmployeeInfo.lastname = 'Doe';
      mockEmployeeInfo.email = 'john@example.com';
      mockErrors.email = 'Invalid email';
      expect(isValidPersonalInfo(mockEmployeeInfo, mockErrors)).toBe(true);
    });

    it('should return false if all personal info is provided and no email error', () => {
      mockEmployeeInfo.firstname = 'John';
      mockEmployeeInfo.lastname = 'Doe';
      mockEmployeeInfo.email = 'john@example.com';
      expect(isValidPersonalInfo(mockEmployeeInfo, mockErrors)).toBe(false);
    });
  });

  describe('isValidJobInfo', () => {
    it('should return true if any job info is missing', () => {
      expect(isValidJobInfo(mockEmployeeInfo)).toBe(true);
    });

    it('should return false if all job info is provided', () => {
      mockEmployeeInfo.department = 'IT';
      mockEmployeeInfo.jobTitle = ['Developer'];
      mockEmployeeInfo.salary = '50000';
      mockEmployeeInfo.employmentStatus = 'Full-time';
      expect(isValidJobInfo(mockEmployeeInfo)).toBe(false);
    });
  });

  describe('isValidAdditionalInfo', () => {
    it('should return true if any additional info is missing', () => {
      expect(isValidAdditionalInfo(mockEmployeeInfo)).toBe(true);
    });

    it('should return false if all additional info is provided', () => {
      mockEmployeeInfo.ladderLevel = 'Senior';
      mockEmployeeInfo.imageURL = 'http://example.com/image.jpg';
      expect(isValidAdditionalInfo(mockEmployeeInfo)).toBe(false);
    });
  });
});
