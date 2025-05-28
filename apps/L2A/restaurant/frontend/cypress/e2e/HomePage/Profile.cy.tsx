describe('Enrollment Page', () => {
  beforeEach(() => {
    cy.clerkLogin('/profile', 'test+clerk_test@gmail.com');
  });
  it('should display the user section heading', () => {
    cy.visit('/profile');
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('exist').and('have.text', 'Хэрэглэгчийн хэсэг').and('have.class', 'text-center').and('have.class', 'font-bold');

    it('1. Should render the page successfully")', () => {
      cy.get('[data-cy="user-profile"]').should('be.visible');
    });
  });
});
