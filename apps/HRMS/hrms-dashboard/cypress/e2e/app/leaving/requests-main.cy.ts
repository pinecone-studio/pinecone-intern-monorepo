describe('Main Component', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it('1.renders Requests component', () => {
    cy.get('[data-cy="stack"]').should('exist');
    cy.get('[data-cy="requests"]').should('exist');
  });
});
