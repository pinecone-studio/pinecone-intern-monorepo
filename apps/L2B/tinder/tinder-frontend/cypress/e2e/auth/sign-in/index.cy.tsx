describe('SignInPage Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email');
    cy.get('[data-testid="password-error"]').should('contain.text', 'Password must be at least 8 characters');
  });

  it('should sign in successfully and store token', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SignIn') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              signIn: 'fake-jwt-token',
            },
          },
        });
      }
    }).as('signInMutation');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('validPassword123');
    cy.get('button[type="submit"]').click();

    cy.wait('@signInMutation');

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token')).to.eq('fake-jwt-token');
    });

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    cy.get('[data-sonner-toast]').should('contain.text', 'Login successful');
  });

  it('should display error toast when server returns no token', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SignIn') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              signIn: null, // simulate missing token
            },
          },
        });
      }
    }).as('signInNoToken');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('validPassword123');
    cy.get('button[type="submit"]').click();

    cy.wait('@signInNoToken');

    cy.get('[data-sonner-toast]').should('contain.text', 'No token returned');
  });

  it('should display error toast for failed sign in', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SignIn') {
        req.reply({
          statusCode: 500,
          body: {
            errors: [{ message: 'Invalid credentials' }],
          },
        });
      }
    }).as('signInFailure');

    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@signInFailure');

    cy.get('[data-sonner-toast]').should('contain.text', 'Invalid email or password');
  });
});
