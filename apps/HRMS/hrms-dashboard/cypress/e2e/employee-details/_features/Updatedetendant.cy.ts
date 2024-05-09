describe('update dependant', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1.Should visit to update page', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.url().should('include', 'update');
    cy.get('[data-cy="updateDependant"]').should('exist').should('be.visible');
  });
});
