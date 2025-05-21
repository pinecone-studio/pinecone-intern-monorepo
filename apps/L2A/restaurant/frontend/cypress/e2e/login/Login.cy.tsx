describe('Login Page', () => {
  beforeEach(() => {
    cy.clerkLogin('/login', 'test+clerk_test@gmail.com');
  });
  it('should display the login button', () => {
    cy.visit('/');
  });
});
