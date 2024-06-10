describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Payroll Page');
  });
  it('have been advance salary', () => {
    cy.get('[data-cy="advanceSalary"]').contains('Урьдчилгаа цалин').should('exist').should('be.visible');
    cy.get('[data-cy="calculateSalary"]').contains('Бодогдох цалин').should('exist').should('be.visible');
    cy.get('[data-cy="workAllTime"]').should('exist').should('be.visible');
    cy.get('[data-cy="Salary"]').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurity"]').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurityPercent"]').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurityMoney"]').should('exist').should('be.visible');
    cy.get('[data-cy="taxes"]').contains('ХХОАТ').should('exist').should('be.visible');
    cy.get('[data-cy="taxesMoney"]').should('exist').should('be.visible');
    cy.get('[data-cy="actualMount"]').contains('Гарт олгох дүн').should('exist').should('be.visible');
    cy.get('[data-cy="actualMountMoney"]').should('exist').should('be.visible');
  });
});
