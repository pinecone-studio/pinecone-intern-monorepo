describe('Articles Page', () => {
  beforeEach(() => {
    cy.visit('/articles');
  });

  it('Should render Articles page', () => {
    cy.get('[data-cy="Articles-Page"]').should('exist');
  });
});
