describe('Sign In Form', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('1.should render email and password fields and submit button', () => {
    cy.get('[data-cy="email-Input"]').should('be.visible');
    cy.get('[data-cy="password-Input"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').should('be.visible');
  });

  it('2.should show error on incorrect credentials', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'LoginUser') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Login failed' }],
          },
        });
      }
    }).as('loginRequest');
    cy.get('[data-cy="email-Input"]').type('user@example.com');
    cy.get('[data-cy="password-Input"]').type('wrongpass');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@loginRequest');
    cy.get('[data-cy="error message"]').should('contain.text', 'Login failed');
  });

  it('3.should redirect on successful login', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'LoginUser') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              loginUser: {
                token: 'mock-token',
              },
            },
          },
        });
      }
    }).as('loginRequest');
    cy.get('[data-cy="email-Input"]').type('user@example.com');
    cy.get('[data-cy="password-input"]').type('correctpass');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@loginRequest');
  });
});
