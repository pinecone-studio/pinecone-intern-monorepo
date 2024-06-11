describe('Comments Page', () => {
  beforeEach(() => {
    cy.visit('/comments');
  });
  it('Should render comments page', () => {
    cy.get('[data-cy="Comments-Page"]').should('exist');
  });
});
