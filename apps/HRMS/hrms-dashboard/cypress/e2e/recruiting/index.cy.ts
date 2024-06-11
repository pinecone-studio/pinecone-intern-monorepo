describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });
  it('Should render Leaving page', () => {
    cy.get('[data-cy="Recruiting-Page"]').should('exist');
  });
});
