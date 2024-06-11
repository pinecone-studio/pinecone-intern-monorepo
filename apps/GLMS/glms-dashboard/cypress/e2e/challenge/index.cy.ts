describe('Challenge Page', () => {
  beforeEach(() => {
    cy.visit('/challenge');
  });
  it('Should render Challenge page', () => {
    cy.get('[data-cy="Challenge-Page"]').should('exist');
  });
});
