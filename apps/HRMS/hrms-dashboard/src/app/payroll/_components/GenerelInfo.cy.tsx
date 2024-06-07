// import React from 'react';
// import GeneralInfo from '../../../../hrms-dashboard/src/app/payroll/_components/GeneralInfo';

// describe('<GeneralInfo />', () => {
//   it('renders', () => {
//     // see: https://on.cypress.io/mounting-react
//     cy.mount(<GeneralInfo />);
//   });
// });

describe('GeneralInfo component', () => {
  beforeEach(() => cy.visit('/'));

  it('Component should be visible', () => {
    // Use cy.visit() or cy.get() to interact with the component
    cy.get('[data-testid="general-info"]').should('be.visible');
  });
});
