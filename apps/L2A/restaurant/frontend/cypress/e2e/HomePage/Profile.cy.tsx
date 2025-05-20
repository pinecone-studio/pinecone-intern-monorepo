describe('Enrollment Page', () => {
  beforeEach(() => {
    cy.clerkLogin('/profile', 'test+clerk_test@gmail.com');
  });
  it('should display the user section heading', () => {
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('be.visible');
  });
  it('should render the user profile component', () => {
    cy.get('[data-cyid="user-profile"]').should('be.visible');
  });
});
