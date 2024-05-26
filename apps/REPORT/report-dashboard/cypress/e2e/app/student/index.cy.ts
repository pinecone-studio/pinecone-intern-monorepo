describe('Student subpage', () => {
  beforeEach(() => cy.visit('/'));

  it('Should display welcome message', () => {
    cy.get('[data-cy="Student-Main"]').should('exist').should('be.visible');
  });
});
