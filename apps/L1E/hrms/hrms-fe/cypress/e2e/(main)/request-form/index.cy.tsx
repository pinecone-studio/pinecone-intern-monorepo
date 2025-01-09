import { interceptGraphql } from 'cypress/utils/intercept-graphql';

describe('requestform page', () => {
  //   after(() => {
  //     deleteTestForm('cypress - test');
  //   });
  it('Should render requestform page', () => {
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
