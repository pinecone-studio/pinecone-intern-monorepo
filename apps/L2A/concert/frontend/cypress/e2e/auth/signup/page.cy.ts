describe('SignUp Page', () => {
  it('should render inputs and sign up button', () => {
    cy.visit('/auth/signup');
    cy.get('input[placeholder="Имэйл хаяг"]').should('exist');
    cy.contains('Бүртгүүлэх').should('exist');
  });
});
