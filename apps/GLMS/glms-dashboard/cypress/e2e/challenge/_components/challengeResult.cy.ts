describe('Challenge result page', () => {
  beforeEach(() => cy.visit('/challenge/result/664d99c9fb7b77a2937a2a30'));

  it('1. Should display', () => {
    cy.get('[data-testid="challenge-result"]').should('exist');
  });
});
