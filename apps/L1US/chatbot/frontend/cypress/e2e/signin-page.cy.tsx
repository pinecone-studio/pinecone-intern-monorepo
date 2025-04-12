describe('Sign In Page', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('should display the sign-in form correctly', () => {
    cy.contains('h2', 'Sign In').should('be.visible');
    cy.get('label[for="email"]').should('contain', 'Email');
    cy.get('input#email').should('be.visible').and('have.attr', 'placeholder', 'Enter your email');
    cy.get('label[for="password"]').should('contain', 'Password');
    cy.get('input#password').should('be.visible').and('have.attr', 'placeholder', 'Enter your password');
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('be.visible');
    cy.contains('button[type="submit"]', 'Sign In').should('be.visible');
    cy.contains('span', "Don't have an account?").should('be.visible');
    cy.contains('button', 'Sign Up').should('be.visible');
  });

  it('should display "Show" on the toggle button by default and the input type should be "password"', () => {
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('exist');
  });

  it('should toggle password visibility when clicking the toggle button', () => {
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').click();
    cy.get('input#password').should('have.attr', 'type', 'text');
    cy.contains('button', 'Hide').click();
    cy.get('input#password').should('have.attr', 'type', 'password');
  });

  it('should sign in a user successfully, store the token, and redirect to the home page', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.query && req.body.query.includes('mutation LoginUser')) {
        req.reply({
          data: {
            loginUser: {
              user: {
                _id: '1',
                username: 'testuser',
                email: 'test@example.com',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              sessionToken: 'dummyToken',
            },
          },
        });
      }
    }).as('loginUser');

    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('Test@1234');
    cy.get('form').submit();
    cy.wait('@loginUser');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('dummyToken');
    });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate to the sign-up page when the Sign Up button is clicked', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/sign-up');
  });
});
