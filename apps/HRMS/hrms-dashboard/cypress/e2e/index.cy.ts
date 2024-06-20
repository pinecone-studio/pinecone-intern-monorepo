describe('home page', () => {
  beforeEach(() => cy.visit('/'));
  it('1.Page should have content', () => {
    cy.get('[data-cy="Home-Page"]').should('exist');
  });
});
