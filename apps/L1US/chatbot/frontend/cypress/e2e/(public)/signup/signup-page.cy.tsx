describe('Signup Page E2E tests', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it(`should render the signup form with all required fields`, () => {
    cy.get('input#email').should('exist');
    cy.get('input#username').should('exist');
    cy.get('input#password').should('exist');
    cy.contains('Sign Up').should('exist');
    cy.contains('Show').should('exist');
  });

  it('should toggle password visibility when clicking toggle button', () => {
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('Show').click();

    cy.get('input#password').should('have.attr', 'type', 'text');
    cy.contains('Hide').click();
    cy.get('input#password').should('have.attr', 'type', 'password');
  });

  it('should register a user successfully and redirect to the home page', () => {
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (req.body && req.body.query && req.body.query.includes('registerUser')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              registerUser: {
                sessionToken: 'dummy-token',
              },
            },
          },
        });
      }
    }).as('registerUser');

    cy.get('input#email').type('test@example.com');
    cy.get('input#username').type('testuser');
    cy.get('input#password').type('testpassword');

    cy.get('button[type="submit"]').click();
    cy.wait('@registerUser');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.equal('dummy-token');
    });

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate to the login page when the Login button is clicked', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });
});
