describe('Forget Password Page', () => {
  const testEmail = 'user@example.com';
  beforeEach(() => {
    cy.visit('/forget-password');
  });
  it('1.renders all form elements correctly', () => {
    cy.contains('Forget password').should('be.visible');
    cy.contains('Enter your email account to reset password').should('be.visible');
    cy.get('form').within(() => {
      cy.get('input[type="email"]').should('exist').and('have.attr', 'placeholder', 'email@example.com');
      cy.get('button').contains('Continue').should('exist').and('not.be.disabled');
    });
  });
  it('2.allows typing an email and submitting the form', () => {
    cy.get('input[type="email"]').type(testEmail).should('have.value', testEmail);
    cy.get('button').contains('Continue').click();
  });
});
