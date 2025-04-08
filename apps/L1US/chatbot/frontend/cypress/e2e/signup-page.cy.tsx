describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should display the sign-up form correctly', () => {
    cy.contains('h2', 'Sign Up').should('be.visible');
    cy.get('label[for="email"]').should('contain', 'Email');
    cy.get('input#email').should('be.visible').and('have.attr', 'placeholder', 'Enter your email');
    cy.get('label[for="username"]').should('contain', 'Username');
    cy.get('input#username').should('be.visible').and('have.attr', 'placeholder', 'Enter your username');
    cy.get('label[for="password"]').should('contain', 'Password');
    cy.get('input#password').should('be.visible').and('have.attr', 'placeholder', 'Enter your password');
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('be.visible');
    cy.contains('button[type="submit"]', 'Sign Up').should('be.visible');
    cy.contains('span', 'Already have an account?').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });

  it('should display "Show" on the toggle button by default and the input type should be "password"', () => {
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('exist');
  });

  it('should toggle password visibility when clicking the toggle button', () => {
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('exist');

    cy.contains('button', 'Show').click();
    cy.get('input#password').should('have.attr', 'type', 'text');
    cy.contains('button', 'Hide').should('exist');

    cy.contains('button', 'Hide').click();
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.contains('button', 'Show').should('exist');
  });

  it('should register a user successfully, store the token, and redirect to the home page', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.query && req.body.query.includes('mutation RegisterUser')) {
        req.reply({
          data: {
            registerUser: {
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
    }).as('registerUser');
    cy.visit('/sign-up');

    cy.get('input#email').type('test@example.com');
    cy.get('input#username').type('testuser');
    cy.get('input#password').type('Test@1234');

    cy.get('form').submit();
    cy.wait('@registerUser');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('dummyToken');
    });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate to the sign-in page when the Sign In button is clicked', () => {
    cy.contains('Sign In').click();
    cy.url().should('include', '/sign-in');
  });
});