describe('SignInPage Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      const operationName = req.body.operationName;

      if (operationName === 'SignIn') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              signIn: 'mocked-jwt-token',
            },
          },
        });
      }

      if (operationName === 'GetCurrentUser') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              getCurrentUser: {
                _id: '1',
                email: 'tuuguu123123@gmail.com',
                isVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                verficationCode: '123456',
                __typename: 'User',
              },
            },
          },
        });
      }
    });

    window.localStorage.setItem('token', 'mocked-jwt-token');

    cy.visit('/auth/sign-in');
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email');
    cy.get('[data-testid="password-error"]').should('contain.text', 'Password must be at least 8 characters');
  });

  it('should display error toast for failed sign in', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'SignIn') {
        req.reply({
          statusCode: 401,
          body: {
            errors: [{ message: 'Invalid email or password' }],
          },
        });
      }
    });

    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('[data-sonner-toast]').should('contain.text', 'Invalid email or password');
  });

  it('should sign in successfully and store token', () => {
    cy.get('input[name="email"]').type('tuuguu123123@gmail.com');
    cy.get('input[name="password"]').type('90131305');
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="avatar-button"]').should('be.visible').click();
    cy.get('[data-testid="logout-button"]').click();
  });
});
