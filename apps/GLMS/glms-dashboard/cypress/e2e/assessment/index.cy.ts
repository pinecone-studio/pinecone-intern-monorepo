describe('Assessment Page', () => {
  beforeEach(() => {
    cy.visit('/assessment');
  });

  it('Should render Leaving page', () => {
    cy.get('[data-cy="Assessment-Page"]').should('exist');
  });
});
