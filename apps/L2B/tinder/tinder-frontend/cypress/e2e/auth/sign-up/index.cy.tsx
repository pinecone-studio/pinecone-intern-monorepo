describe('SignUpPage Steps', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-up');
  });

  it('should go from step 1 to step 3 and display the email', () => {
    cy.get('input[placeholder="email"]').should('exist');
    cy.get('input[placeholder="email"]').type('test@example.com');
    cy.contains('next step').click();

    cy.contains('next step').click();

    cy.contains('3step').should('exist');
    cy.contains('test@example.com').should('exist');
  });
});
