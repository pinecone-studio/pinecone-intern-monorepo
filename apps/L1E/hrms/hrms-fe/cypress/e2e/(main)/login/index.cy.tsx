import { interceptGraphql } from 'cypress/utils/intercept-graphql';

describe('login Page', () => {
  it('1. should render the Login Page', () => {
    interceptGraphql({
      state: 'success',
      operationName: 'GetEmployeeByEmail',
      data: {
        data: {
          getEmployeeByEmail: {
            _id: '676e6dd407d5ae05a35cda84',
            email: 'jvk@gmail.com',
            jobTitle: 'senior',
            username: 'jvk',
            adminStatus: true,
            remoteLimit: 5,
            paidLeaveLimit: 5,
            freeLimit: 5,
            employeeStatus: 'Employee',
            otpToken: '6000',
            otpUpdatedAt: 'Tue Jan 14 2025 14:00:15 GMT+0800 (Ulaanbaatar Standard Time)',
            updatedAt: 'Tue Jan 14 2025 14:00:15 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
            __typename: 'Employee',
          },
        },
      },
    });

    interceptGraphql({
      state: 'success',
      operationName: 'GetEmployeeByOtp',
      data: {
        data: {
          getEmployeeByEmail: {
            _id: '676e6dd407d5ae05a35cda84',
            email: 'jvk@gmail.com',
            jobTitle: 'senior',
            username: 'jvk',
            adminStatus: true,
            remoteLimit: 5,
            paidLeaveLimit: 5,
            freeLimit: 5,
            employeeStatus: 'Employee',
            otpToken: '6000',
            otpUpdatedAt: 'Tue Jan 14 2025 14:00:15 GMT+0800 (Ulaanbaatar Standard Time)',
            updatedAt: 'Tue Jan 14 2025 14:00:15 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
            __typename: 'Employee',
          },
        },
      },
    });

    cy.visit('/login');
    cy.get('[data-cy=login-page]').should('be.visible');
    cy.get('[data-cy=email-input]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.visible');

    cy.get('[data-cy=email-input]').type('jvk@gmail.com');
    cy.get('[data-cy=login-submit]').click();

    cy.get('[data-cy=login-otp-stage]').should('be.visible');
    cy.get('[data-cy=enter-input]').type('6000');
  });

  it('2.should display an error when email input is empty', () => {
    cy.visit('/login');

    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'И-мэйл хаягаа оруулна уу ');
  });

  it('3.should display an error for a non-existent email', () => {
    cy.visit('/login');

    cy.get('[data-cy= email-input]').type('nonexistent@example.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=error-message]').should('be.visible').and('contain', 'Ийм и-мэйл байхгүй байна');
  });

  it('4. should display an error for an invalid OTP', () => {
    cy.visit('/login');

    cy.get('[data-cy=email-input]').type('jvk@gmail.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=enter-input]').type('1234');
    cy.get('[data-cy=error-otp]').should('be.visible').and('contain', 'otp таарахгүй байна.');
  });
  it('5. should back email-input', () => {
    cy.visit('/login');
    cy.get('[data-cy=email-input]').type('jvk@gmail.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=back-button]').click();
  });

  it('6.should resend the OTP when the resend button is clicked', () => {
    cy.visit('/login');

    cy.get('[data-cy=email-input]').type('jvk@gmail.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=resent-otp]').click();
    cy.get('[data-cy=error-otp]').should('be.visible').and('contain', 'OTP дахин илгээж байна...');
  });
});
