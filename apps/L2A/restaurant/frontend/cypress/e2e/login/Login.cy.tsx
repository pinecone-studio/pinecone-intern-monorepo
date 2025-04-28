describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should render the Logo', () => {
    cy.get('[data-testid="Logo-image"]').should('be.visible');
    cy.get('[data-cy="login-btn"]').should('be.visible').and('contain.text', 'Нэвтрэх');
  });
  it('should open the sign-in modal when login button is clicked', () => {
    cy.get('[data-cy="login-btn"]').click();
  });
});
