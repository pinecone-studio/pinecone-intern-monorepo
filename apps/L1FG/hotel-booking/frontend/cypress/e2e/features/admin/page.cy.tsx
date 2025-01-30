describe('Admin Home Page', () => {
  it('shuold render admin home page', () => {
    cy.visit('/admin');
    cy.get('[data-cy=Admin-Add-Hotel-Button]').click();
    cy.url().should('include', '/admin/add-hotel');
  });
});
