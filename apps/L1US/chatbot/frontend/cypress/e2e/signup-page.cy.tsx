describe('Sign‑up Page', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('shows required errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-400').should('have.length', 3);
  });

  it('shows validation errors for bad input', () => {
    cy.get('input[name="email"]').type('bad');
    cy.get('input[name="username"]').type('ab');
    cy.get('input[name="password"]').type('short');
    cy.get('button[type="submit"]').click();

    cy.contains('.text-red-400', 'Invalid email').should('exist');
    cy.contains('.text-red-400', 'Must be at least 3 characters').should('exist');
    cy.contains('.text-red-400', 'Must be at least 8 characters').should('exist');
  });

  it('submits valid data and redirects to home', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'RegisterUser') {
        req.reply({
          data: {
            registerUser: {
              sessionToken: 'fake-token',
              user: { id: '2', email: 'new@user.com', username: 'newuser' },
            },
          },
        });
      }
    }).as('signup');

    cy.get('input[name="email"]').type('new@user.com');
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
