describe('Sign‑in Page', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('shows required errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.text-red-400').should('have.length', 2);
    cy.get('.text-red-400').each(($el) => {
      cy.wrap($el).should('contain.text', 'Required');
    });
  });

  it('shows validation errors for bad input', () => {
    cy.get('input[name="email"]').type('not-an-email');
    cy.get('input[name="password"]').type('short');
    cy.get('button[type="submit"]').click();

    cy.contains('.text-red-400', 'Invalid email').should('exist');
    cy.contains('.text-red-400', 'Must be at least 8 characters').should('exist');
  });

  it('submits valid credentials and redirects to home', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'LoginUser') {
        req.reply({
          data: {
            loginUser: {
              sessionToken: 'fake-token',
              user: { id: '1', email: 'test@example.com', username: 'tester' },
            },
          },
        });
      }
    }).as('login');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
