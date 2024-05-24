describe('update employment', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1. Should visit to update page', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.url().should('include', 'update');
    cy.get('[data-cy="updateEmployment"]').should('exist').should('be.visible');
  });
  it('2. Header and button should be visible', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.url().should('include', 'update');
    cy.get('[data-cy="employmentPageTitle"]').should('be.visible');
    cy.get('[data-cy="updateEmploymentInfoBtn"]').click();
  });
  it('3. Should open update employment form when update button is clicked', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').click();
    cy.get('[data-testid="update-employment"]').should('exist').should('be.visible');
    cy.get('[ data-testid="closeSvg"]').should('be.visible');
    cy.get('[ data-testid="closeSvg"]').click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').click();
    cy.get('[data-testid="update-employment"]').should('exist').should('be.visible');
  });
});
