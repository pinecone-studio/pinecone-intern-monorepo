describe('update dependant', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1.Should visit to update page', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(2).click();
    cy.url().should('include', 'update');
    cy.get('[data-cy="updateDependent"]').should('exist').should('be.visible');
  });

  it('update button click', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(3).click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-cy="cancel-button"]').should('exist').click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('B');
    cy.get('[data-testid="customInput"]').eq(1).should('exist').type('D');
    cy.get('[data-testid="customInput"]').eq(2).should('exist').type('8');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('f');
    cy.get('[data-cy="submit-button"]').should('exist').click();
  });

  it('create button click', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="add-information"]').should('exist').click();
    cy.get('[data-cy="cancel-button"]').click();
    cy.get('[data-testid="add-information"]').should('exist').click();
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid=add-information]').should('be.visible').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('Batbold');
    cy.get('[data-testid="customInput"]').eq(1).should('exist').type('Dorj');
    cy.get('[data-testid="customInput"]').eq(2).should('exist').type('90909090');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('father');
    cy.get('[data-cy="submit-button"]').should('exist').click();
    cy.intercept({ method: 'POST' }).as('createDependent');
    cy.wait('@createDependent', { timeout: 1000 });
  });
});
