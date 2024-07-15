describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render the TableContent component', () => {
    cy.get('[data-cy="contentList"]').should('exist');
  });
});
