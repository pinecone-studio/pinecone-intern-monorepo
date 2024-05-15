describe('create dependent', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('create button', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="add-information"]').should('exist').click();
  });

  it('should display the form inputs and buttons', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid=add-information]').should('be.visible').click();
    cy.get('[data-cy="addDependentForm"]').should('exist');
    cy.get('[data-testid="close-button"]').click();
  });

  it('input helper text', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid=add-information]').should('be.visible').click();
    cy.get('[data-cy="cancel-button"]').should('exist').click();
  });

  it('create dependet input form', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid=add-information]').should('be.visible').click();
    cy.get('[data-cy="cancel-button"]').click();
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
