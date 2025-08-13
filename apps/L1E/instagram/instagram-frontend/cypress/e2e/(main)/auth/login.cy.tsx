describe('Auth basic flow', () => {
  const token = 'fake-jwt-token';

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body as { query?: string };
      if (typeof body?.query === 'string' && body.query.includes('mutation Login')) {
        req.reply({ body: { data: { login: { token, user: { id: '1', email: 'test@example.com' } } } } });
        return;
      }
    }).as('graphql');
  });

  it('persists token and shows profile page', () => {
    window.localStorage.setItem('token', token);

    cy.visit('/profile');
    cy.contains('h1', 'Profile').should('be.visible');
  });
});

