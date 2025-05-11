describe('Forget Password Page', () => {
  it('should click on onSubmit', () => {
    cy.visit('/auth/forget-password');
    cy.get('[data-testid="forget-password-email-input"]').type('glpzghoo@gmail.com');
    cy.get('button[type="submit"]').click();
  });
});
