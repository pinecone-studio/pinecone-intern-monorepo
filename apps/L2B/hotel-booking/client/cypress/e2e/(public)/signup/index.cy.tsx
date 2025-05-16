describe('Signup Page', () => {
  let uniqueEmail: string;

  beforeEach(() => {
    const timestamp = Date.now();
    uniqueEmail = `testuser_${timestamp}@example.com`;

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'AddUser') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              createUser: {
                id: 'abc123',
                email: uniqueEmail,
              },
            },
          },
        });
      }
    }).as('mockCreateUser');

    cy.visit('/signup');
  });

  it('1. Should render sign-up', () => {
    cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
  });

  it('2. When user does not enter email, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('have.text', 'Valid email is required');
  });

  it('3. when user enters all values, it should navigate to login page', () => {
    cy.get('[data-cy=Sign-Up-Email-Input]').type(uniqueEmail);
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
  });

  it('4. Login button should navigate to /signin page', () => {
    cy.get('[data-cy=Sign-Up-Login-Button]').click();
    cy.url().should('include', '/signin');
  });

  it('5. When user does not enter password, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-Email-Input]').type(uniqueEmail);
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();

    cy.get('[data-cy=Sign-Up-Password-Submit-Button]').should('be.visible').click();
    cy.get('[data-cy=Sign-Up-Password-Input-Error-Message]').should('be.visible').should('have.text', 'Password is required.');

    cy.get('[data-cy=Sign-Up-Password-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-ConfirmPassword-Input-Error-Message]').should('be.visible').should('have.text', 'Confirm Password is required.');

    cy.get('[data-cy=Sign-Up-Password-Input]').type('TestPassword123');
    cy.get('[data-cy=Sign-Up-ConfirmPassword-Input]').type('DifferentPassword456');
    cy.get('[data-cy=Sign-Up-Password-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-ConfirmPassword-Input-Error-Message]').should('be.visible').should('have.text', 'Passwords do not match.');

    cy.get('[data-cy=Sign-Up-Password-Input]').clear().type('TestPassword123');
    cy.get('[data-cy=Sign-Up-ConfirmPassword-Input]').clear().type('TestPassword123');

    cy.get('[data-cy=Sign-Up-Password-Submit-Button]').click();

    cy.location('pathname').should('eq', '/signin');
  });
});
