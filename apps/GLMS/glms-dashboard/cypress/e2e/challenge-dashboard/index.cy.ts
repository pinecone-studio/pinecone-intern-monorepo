describe('Page Component', () => {
  beforeEach(() => {
    cy.visit('/challenge-dashboard');
  });

  it('should display challenge dashboard page and its components', () => {
    cy.get('[data-testid="challenge-dashboard-page"]').should('be.visible');
    cy.get('[data-cy="radio-button"]').should('exist');
    cy.get('[data-cy="select-button"]').should('exist');
    cy.get('[data-cy="select-button"]').select('bn');
    cy.get('[data-cy="select-button"]').should('have.value', 'bn');
    cy.get('[data-cy="add-challenge-button"]').should('exist').click();
    cy.contains('button', 'text').should('be.visible');
  });
  it('should close modal', () => {
    cy.get('[data-cy="add-challenge-button"]').should('exist').click();
    cy.get('[data-cy="next-page-btn"]').should('exist').click();
  });
});
