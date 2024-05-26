describe('Detail Feature', () => {
  const testId = '663b47469c02f6e5f38ef5c1';
  beforeEach(() => {
    cy.visit(`/leaving/Detail?requestId=${testId}`);
  });

  it('1.should approve request when approve button is clicked', () => {
    cy.get('[data-testid="approve-button"]').click();
    cy.get('[data-testid="request-status"]').should('contain.text', 'Зөвшөөрөх');
  });

  it('2.should decline request when decline button is clicked', () => {
    cy.get('[data-testid="decline-button"]').click();
    cy.get('[data-testid="request-status"]').should('contain.text', 'Татгалзах');
  });

  it('3.should navigate back when back button is clicked', () => {
    cy.get('[data-testid="back"]').click();
    cy.url().should('include', '/leaving');
  });
});
