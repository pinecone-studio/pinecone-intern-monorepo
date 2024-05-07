describe('Requests feature', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it('1.renders loading state initially', () => {
    cy.get('p').should('contain.text', 'Loading...');
  });
  it('2.Status be in feature', () => {
    cy.get('[data-testid="request-status"]').should('exist');
  });
});
