describe('Home page', () => {
  it('Should jumpt to login page', () => {
    cy.clearCookie('token');
    cy.visit('/');
    cy.location('pathname').should('equal', '/login');
  });
});
