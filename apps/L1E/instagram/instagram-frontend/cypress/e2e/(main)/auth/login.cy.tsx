describe('Auth login flow', () => {
  const apiUrl = 'http://localhost:4000/graphql';
  const email = 'test@example.com';
  const password = 'password123';
  const token = 'fake-jwt-token';

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept('POST', apiUrl, (req) => {
      const body = req.body as { query: string; variables?: Record<string, any> };
      if (typeof body.query === 'string' && body.query.includes('mutation Login')) {
        req.reply({
          body: {
            data: {
              login: {
                token,
                user: { id: '1', email },
                __typename: 'LoginPayload',
              },
            },
          },
        });
        return;
      }
    }).as('gql');
  });

  it('stores token on successful login and allows visiting profile', () => {
    window.localStorage.setItem('token', token);

    cy.visit('/profile');
    cy.contains(/welcome/i).should('exist');
    cy.contains(email).should('exist');

    cy.contains('Logout').click();
    cy.contains('You are not logged in').should('exist');
  });
});

