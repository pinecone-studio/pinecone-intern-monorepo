describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Should render the TableContent component', () => {
    cy.get('[data-cy="contentList"]').should('exist');
  });
});
