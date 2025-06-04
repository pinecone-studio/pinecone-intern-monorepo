describe('Main page access', () => {
  it('shows main page for guests (no JWT)', () => {
    cy.clearLocalStorage();
    cy.visit('/');

    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="guest-header"]').should('be.visible');
    cy.get('[data-testid="main"]').should('be.visible');
    cy.get('[data-testid="footer"]').should('be.visible');
  });

  it('redirects to swipe page if JWT exists', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-jwt-token');
      },
    });

    cy.location('pathname', { timeout: 10000 }).should('eq', '/swipe-page');
  });
});
