describe('Leaving Page', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it('Should render Leaving page', () => {
    cy.get('[data-cy="Leaving-Page"]').should('exist');
  });
});
