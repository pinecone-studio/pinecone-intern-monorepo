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
    cy.get('[data-cy=createUser-username-error]').should('have.text', 'Username must be at least 2 characters.');
  });
  it('3. an error message should be displayed when the user did not enter an email', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-email-error]').should('be.visible');
    cy.get('[data-cy=createUser-email-error]').should('have.text', 'Please enter a valid email');
  });
  it('4. an error message should be displayed when the user did not enter password', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-password]').type('12');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-password-error]').should('be.visible');
    cy.get('[data-cy=createUser-password-error]').should('have.text', 'Please enter at least 8 letters');
  });
  it('5. an error message should be displayed when the user did not enter confrim password', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-confirmPassword]').type('12');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.get('[data-cy=createUser-confirmPassword-error]').should('be.visible');
    cy.get('[data-cy=createUser-confirmPassword-error]').should('have.text', 'Please enter at least 8 letters');
  });
  it('6. when user enters all values, it should navigate to login page', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-username]').type('Test');
    cy.get('[data-cy=createUser-email]').type('testcy@gmail.com');
    cy.get('[data-cy=createUser-password]').type('test@123');
    cy.get('[data-cy=createUser-confirmPassword]').type('test@123');
    cy.get('[data-cy=createUser-submit-btn]').click();
    cy.url().should('include', 'sign-in');
  });
  it('7. when user click the login button, it should navigate to login page', () => {
    cy.visit('/sign-up');
    cy.get('[data-cy=createUser-login-btn]').click();
    cy.url().should('include', 'sign-in');
  });
});
