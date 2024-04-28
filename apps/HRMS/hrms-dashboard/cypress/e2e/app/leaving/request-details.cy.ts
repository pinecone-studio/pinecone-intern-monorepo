describe('Detail Feature', () => {
  const testId = '6627615b0e17dca819034a5a';
  beforeEach(() => {
    cy.visit(`/leaving/Detail?requestId=${testId}`);
  });

  it('1.should approve request when approve button is clicked', () => {
    cy.get('[data-testid="approve-button"]').click();
    cy.get('[data-testid="request-status"]').should('contain.text', 'approved');
  });

  it('2.should decline request when decline button is clicked', () => {
    cy.get('[data-testid="decline-button"]').click();
    cy.get('[data-testid="request-status"]').should('contain.text', 'declined');
  });

  it('3.should navigate back when back button is clicked', () => {
    cy.get('[data-testid="back"]').click();
    cy.url().should('include', '/leaving');
  });
});
