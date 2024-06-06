describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Payroll Page');
  });
  it('have been advance salary', () => {
    cy.get('[data-cy="advanceSalary"]').contains('Урьдчилгаа цалин').should('exist').should('be.visible');
    cy.get('[data-cy="calculateSalary"]').contains('Бодогдох цалин').should('exist').should('be.visible');
    cy.get('[data-cy="workAllTime"]').contains('16 хоног (40цаг)').should('exist').should('be.visible');
    cy.get('[data-cy="Salary"]').contains('2,250,000₮').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurity"]').contains('НДШ').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurityPercent"]').contains('(11.5%)').should('exist').should('be.visible');
    cy.get('[data-cy="socialSecurityMoney"]').contains('-258’750₮').should('exist').should('be.visible');
    cy.get('[data-cy="taxes"]').contains('ХХОАТ').should('exist').should('be.visible');
    cy.get('[data-cy="taxesMoney"]').contains('-199’125₮').should('exist').should('be.visible');
    cy.get('[data-cy="actualMount"]').contains('Гарт олгох дүн').should('exist').should('be.visible');
    cy.get('[data-cy="actualMountMoney"]').contains('1’806’125₮').should('exist').should('be.visible');
  });
});
