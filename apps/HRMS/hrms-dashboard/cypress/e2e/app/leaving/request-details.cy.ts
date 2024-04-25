describe('Detail Feature', () => {
  beforeEach(() => {
    cy.visit('leaving/Detail?requestId=6627615b0e17dca819034a5a');
  });

  it('1.should approve request when approve button is clicked', () => {
    cy.get('[data-testid="approve-button"]').click();
  });

  it('2.should decline request when decline button is clicked', () => {
    cy.get('[data-testid="decline-button"]').click();
  });
  it('3.should navigate back when back button is clicked', () => {
    cy.get('[data-testid="back"]').click();
    cy.url().should('include', '/leaving');
  });
});
