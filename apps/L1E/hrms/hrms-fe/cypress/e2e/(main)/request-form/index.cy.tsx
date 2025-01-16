import { interceptGraphql } from 'cypress/utils/intercept-graphql';

describe('requestform page', () => {
  it('Should render requestform page', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    interceptGraphql({
      state: 'success',
      operationName: 'GetEmployeeById',
      data: {
        data: {
          getEmployeeById: {
            _id: '677b83734fba809002930cc5',
            email: 'dash.altanshagai48@gmail.com',
            jobTitle: 'software',
            username: 'shagai12345',
            adminStatus: false,
            remoteLimit: 5,
            paidLeaveLimit: 5,
            freeLimit: 5,
            employeeStatus: 'Employee',
            updatedAt: 'Tue Jan 14 2025 15:29:44 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: '2010',
            __typename: 'Employee',
          },
        },
      },
    });
    interceptGraphql({
      state: 'success',
      operationName: 'GetEmployees',
      data: {
        data: {
          getEmployees: [
            {
              _id: '676e6dfb07d5ae05a35cda8e',
              email: 'test',
              jobTitle: 'junior',
              username: 'Cypress',
              adminStatus: false,
              remoteLimit: 5,
              paidLeaveLimit: 5,
              freeLimit: 5,
              employeeStatus: 'Employee',
              createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
              updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
            },
            {
              _id: '676e6dd407d5ae05a35cda84',
              email: 'test1',
              jobTitle: 'junior',
              username: 'shagai',
              adminStatus: false,
              remoteLimit: 5,
              paidLeaveLimit: 5,
              freeLimit: 5,
              employeeStatus: 'Employee',
              createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
              updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
            },
          ],
        },
      },
    });
    cy.visit('/request-form');

    cy.get('[data-cy=request-form-page]').should('be.visible');

    cy.get('[data-cy=request-form-select-input').click();
    cy.get('[data-cy=select-input-paid]').click();

    cy.get('[data-cy=paid-calendar-btn]').click();
    cy.get('.right-1>.lucide').click();
    cy.get('button[name="day"]').contains('10').click();

    // cy.get('[data-cy=lead-button]').click();
    // cy.get('[data-cy=Option-2]').click();

    // cy.get('[data-cy=notes-input]').type('hello');
    // cy.get('[data-cy=paid-submit-button]').click();
    // cy.get('[data-cy=successmodal]').should('be.visible');
  });
});
