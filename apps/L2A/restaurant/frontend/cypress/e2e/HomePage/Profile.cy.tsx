describe('User Profile Page', () => {
  beforeEach(() => {
    cy.clerkLogin('/profile', 'dev+clerk_test@example.com');
  });

  it('renders the user profile section title', () => {
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('exist').and('contain', 'Хэрэглэгчийн хэсэг');
  });

  it('renders the Clerk UserProfile widget', () => {
    cy.get('[data-cyid=" user-profile"]').should('exist');
    cy.get('[data-cyid=" user-profile"] iframe').should('exist');
  });
});
