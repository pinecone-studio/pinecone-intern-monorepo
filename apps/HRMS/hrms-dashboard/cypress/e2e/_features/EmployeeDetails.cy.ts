// cypress/e2e/employee-details.cy.ts

import { Department, EmploymentStatus } from '@/generated';
import { EmployeesInfoType } from '../../../src/app/employee-details/_features/EmplyeeDetails';
import { isValidPersonalInfo, isValidJobInfo, isValidAdditionalInfo } from '../../../src/app/employee-details/utils/validation-utils';

describe('EmployeeDetails Component', () => {
  // ... (previous code remains the same)

  it('should validate personal information', () => {
    cy.contains('button', 'Ажилтан нэмэх').click();
    cy.contains('button', 'Дараах').click();

    cy.window().then(() => {
      const values: EmployeesInfoType = {
        firstname: '',
        lastname: '',
        email: '',
        imageURL: '',
        department: Department.Software,
        jobTitle: [''],
        ladderLevel: '',
        salary: '',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      };
      const errors = { email: 'Invalid email' };

      const isInvalid = isValidPersonalInfo(values, errors);
      cy.wrap(isInvalid).should('be.true');
    });

    cy.contains('Овог оруулна уу').should('be.visible');
    cy.contains('Нэр оруулна уу').should('be.visible');
    cy.contains('Имайл оруулна уу').should('be.visible');
  });

  it('should validate job information', () => {
    cy.contains('button', 'Ажилтан нэмэх').click();
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.contains('button', 'Дараах').click();

    cy.window().then(() => {
      const values: EmployeesInfoType = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        imageURL: '',
        department: Department.Software,
        jobTitle: [''],
        ladderLevel: '',
        salary: '',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      };

      const isInvalid = isValidJobInfo(values);
      cy.wrap(isInvalid).should('be.true');
    });

    cy.contains('button', 'Дараах').should('be.disabled');
  });

  it('should validate additional information', () => {
    cy.contains('button', 'Ажилтан нэмэх').click();
    // Fill in personal and job information
    // ...
    cy.contains('button', 'Дараах').click();
    cy.contains('button', 'Дараах').click();

    cy.window().then(() => {
      const values: EmployeesInfoType = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        imageURL: '',
        department: Department.Software,
        jobTitle: ['Developer'],
        ladderLevel: '',
        salary: '100000',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      };

      const isInvalid = isValidAdditionalInfo(values);
      cy.wrap(isInvalid).should('be.true');
    });

    cy.contains('button', 'Хадгалах').should('be.disabled');
  });

  // ... (rest of the code remains the same)
});
