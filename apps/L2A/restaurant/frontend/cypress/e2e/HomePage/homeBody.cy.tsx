describe('HomeBody Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the HomeSheet component inside HomeBody', () => {
    cy.get('[data-testid="home-sheet"]').should('exist');
  });
});
