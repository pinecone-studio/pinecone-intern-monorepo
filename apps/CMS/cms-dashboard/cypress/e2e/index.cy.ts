describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render the TableContent component', () => {
    cy.get('[data-cy="contentList"]').should('exist');
  });

  it('Should show FooterButtons for admin role', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('be.visible');
  });
});
