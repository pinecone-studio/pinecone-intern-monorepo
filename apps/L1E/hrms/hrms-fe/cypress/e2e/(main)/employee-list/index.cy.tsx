/* eslint-disable max-nested-callbacks */
import { interceptGraphql } from 'cypress/utils/intercept-graphql';

describe('employee-list page', () => {
  it('should render employee list page (employee lead approved)', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('employee-list');

    // Ensure the employee list page is visible
    cy.get('[data-cy=employee-list-page]').should('be.visible');

    // Get the initial data-state of the checkbox (inside the span)
    cy.get('[data-cy=check-button-0]').then(($span) => {
      const initialState = $span.attr('data-state'); // Store the initial data-state value (checked or unchecked)

      // Click the button to toggle its state
      cy.get('[data-cy=check-button-0]')
        .click()
        .then(() => cy.get('[data-cy=approve-lead-modal]').click())
        .then(() => {
          // Get the data-state of the span again after the click and assert the state has toggled
          cy.get('[data-cy=check-button-0]').should(($spanAfterClick) => {
            const stateAfterClick = $spanAfterClick.attr('data-state'); // Check the data-state after click

            // Assert that the state has toggled correctly
            expect(stateAfterClick).to.not.equal(initialState); // The state should have changed (toggled)
          });
        });
    });
  });
  it('should render employee list page (employee lead approved)', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('employee-list');

    // Ensure the employee list page is visible
    cy.get('[data-cy=employee-list-page]').should('be.visible');

    // Get the initial data-state of the checkbox (inside the span)
    cy.get('[data-cy=check-button-0]').then(($span) => {
      const initialState = $span.attr('data-state'); // Store the initial data-state value (checked or unchecked)

      // Click the button to toggle its state
      cy.get('[data-cy=check-button-0]')
        .click()
        .then(() => cy.get('[data-cy=approve-lead-modal]').click())
        .then(() => {
          // Get the data-state of the span again after the click and assert the state has toggled
          cy.get('[data-cy=check-button-0]').should(($spanAfterClick) => {
            const stateAfterClick = $spanAfterClick.attr('data-state'); // Check the data-state after click

            // Assert that the state has toggled correctly
            expect(stateAfterClick).to.not.equal(initialState); // The state should have changed (toggled)
          });
        });
    });
  });
  it('shouldrender employeelist page (employee lead rejected)', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('employee-list');
    cy.get('[data-cy=employee-list-page]').should('be.visible');

    cy.get('[data-cy=check-button-0]').click();
    cy.get('[data-cy=approve-lead-modal]').click();
    cy.get('[data-cy=employees-table]').should('be.visible');
  });
  it('shouldrender employeelist page (create amployee)', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    interceptGraphql({
      state: 'success',
      operationName: 'CreateEmployee',
      data: {
        data: {
          createEmployee: {
            _id: '6784d19045cfec983742c22f',
            email: 'Cypress@gmail.com',
            jobTitle: 'Cypress Jobtitle',
            username: 'Cypress Username',
            adminStatus: false,
            remoteLimit: 5,
            paidLeaveLimit: 5,
            freeLimit: 5,
            employeeStatus: 'Lead',
            updatedAt: 'Thu Jan 16 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: 'Thu Jan 16 2025 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
            __typename: 'Employee',
          },
        },
      },
    });

    cy.visit('employee-list');
    cy.get('[data-cy=employee-list-page]').should('be.visible');

    cy.get('[data-cy=create-employee-button]').click();
    cy.get('[data-cy=username-input]').type('Cypress Username');
    cy.get('[data-cy=jobtitle-input]').type('Cypress Jobtitle');
    cy.get('[data-cy=email-input]').type('Cypress@gmail.com');
    cy.get('[data-cy=lead-approve-trigger]').click();
    cy.get('[data-cy=option-lead]').click();
    cy.get('[data-cy=submit-employee-button]').click();
  });
  it('shouldrender employeelist page (create amployee)', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('employee-list');
    cy.get('[data-cy=employee-list-page]').should('be.visible');

    cy.get('[data-cy=create-employee-button]').click();
    cy.get('[data-cy=addEmployee-back-button]').click();
  });
});
