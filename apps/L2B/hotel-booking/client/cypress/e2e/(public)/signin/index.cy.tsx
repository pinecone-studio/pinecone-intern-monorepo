describe('Sign In Flow', () => {
  const testEmail = `testuser${Date.now()}@example.com`;

  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('login')) {
        req.reply({
          data: { login: { token: 'mock-token', message: 'Login successful' } },
        });
      }
    }).as('graphql');
    cy.visit('/signin');
    cy.get('[data-cy=Sign-In-Page]').should('be.visible');
  });

  it('should validate email and password requirements', () => {
    cy.get('[data-cy=submit-btn]').click();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password must be at least 8 characters long').should('be.visible');

    cy.get('[data-cy=email-input]').type('inv alid-email');
    cy.get('[data-cy=submit-btn]').click();
    cy.contains('Email is required').should('be.visible');

    cy.get('[data-cy=email-input]').clear().type(testEmail);
    cy.get('[data-cy=password-input]').type('short');
    cy.get('[data-cy=submit-btn]').click();
    cy.contains('Password must be at least 8 characters long').should('be.visible');

    cy.get('[data-cy=password-input]').clear().type('NoNumberPass');
    cy.get('[data-cy=submit-btn]').click();
    cy.contains('Password must include at least one number').should('be.visible');

    cy.get('[data-cy=password-input]').clear().type('NOLOWERCASE123');
    cy.get('[data-cy=submit-btn]').click();
    cy.contains('Password must include at least one lowercase letter').should('be.visible');
  });

  it('should sign in successfully and redirect to homepage', () => {
    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=password-input]').type('ValidPass123');
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');

    cy.window().its('localStorage.authToken').should('eq', 'mock-token');
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('should show error when login fails with invalid credentials', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('login')) {
        req.reply({
          data: { login: { token: null, message: 'Invalid credentials' } },
        });
      }
    }).as('loginError');

    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=password-input]').type('ValidPass123');
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@loginError');
    cy.get('[data-cy=error-message]').should('contain', 'Invalid credentials');
  });

  it('should show error when login fails with network error', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('login')) {
        req.reply({
          statusCode: 500,
          body: { errors: [{ message: 'Network error' }] },
        });
      }
    }).as('networkError');

    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=password-input]').type('ValidPass123');
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@networkError');
    cy.get('[data-cy=error-message]').should('contain', 'Invalid credentials');
  });

  it('should navigate to forget password page', () => {
    cy.contains('Forget password?').click();
    cy.url().should('include', '/forget-password');
  });

  it('should navigate to signup page', () => {
    cy.contains('Create an account').click();
    cy.url().should('include', '/signup');
  });
});
