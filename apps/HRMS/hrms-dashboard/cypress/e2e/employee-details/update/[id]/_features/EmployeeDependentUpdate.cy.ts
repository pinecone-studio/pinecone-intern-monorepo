describe('eployee dependent update', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('update button', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(3).click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="close-button"]').click();
  });

  it('should display the form inputs and buttons', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(3).click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-cy="cancel-button"]').should('exist').click();
  });

  it('eployee dependent update input form', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(3).click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('B');
    cy.get('[data-testid="customInput"]').eq(1).should('exist').type('D');
    cy.get('[data-testid="customInput"]').eq(2).should('exist').type('8');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('f');
    cy.get('[data-cy="submit-button"]').should('exist').click();
  });
});
