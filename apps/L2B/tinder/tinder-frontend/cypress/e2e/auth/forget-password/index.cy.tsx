describe('forget password page', () => {
  beforeEach(() => {
    cy.visit('/auth/forget-password');
  });

  it('should go from step 1 to step 3 and display the email', () => {
    cy.get('input[placeholder="email"]').should('exist');
    cy.get('input[placeholder="email"]').type('test@gmail.com');

    cy.contains('next step').click();

    cy.contains('next step').click();

    cy.contains('test@gmail.com').should('exist');
  });
});
