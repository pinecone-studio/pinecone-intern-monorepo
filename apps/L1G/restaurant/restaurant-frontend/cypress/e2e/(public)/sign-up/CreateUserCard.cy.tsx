describe('CreateUserCard', () => {
  it('1. should render CreateUser page', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=create-user]').should('be.visible');
  });
  it('2. an error message should be displayed when the username is too short', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-username]').type('1');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-username-error]').should('be.visible');
    cy.get('[data-cy=createUser-username-error]').should('have.text', 'Хэрэглэгчийн нэр оруулна уу!');
  });
  it('3. an error message should be displayed when the user did not enter an email', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-email-error]').should('be.visible');
    cy.get('[data-cy=createUser-email-error]').should('have.text', 'Имэйл хаяг буруу байна!');
  });
  it('4. an error message should be displayed when the user did not enter password', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-password]').type('12');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-password-error]').should('be.visible');
    cy.get('[data-cy=createUser-password-error]').should('have.text', 'Нууц үг 6 тэмдэгтээс их байх ёстой!');
  });
  it('5. an error message should be displayed when the user did not enter confirm password', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-confirmPassword]').type('12');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-confirmPassword-error]').should('be.visible');
    cy.get('[data-cy=createUser-confirmPassword-error]').should('have.text', 'Нууц үг давтан оруулна уу!');
  });
  it('6. when user enters all values, it should navigate to login page', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'CreateUser') {
        req.reply({
          data: {
            createUser: {
              username: 'Test',
              email: 'test@example.com',
            },
          },
        });
      }
    }).as('mockSignUp');

    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-username]').type('Test');
    cy.get('[data-cy=createUser-email]').type('test@example.com');
    cy.get('[data-cy=createUser-password]').type('test@123');
    cy.get('[data-cy=createUser-confirmPassword]').type('test@123');
    cy.get('[data-cy=createUser-submit-btn]').click();

    cy.wait('@mockSignUp');
    cy.url().should('include', 'sign-in');
  });
  it('7. when user click the login button, it should navigate to login page', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-login-btn]').click();
    cy.url().should('include', 'sign-in');
  });
});
