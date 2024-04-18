describe('articles page', () => {
  beforeEach(() => cy.visit('/articles'));

  it('1. Should display login form', () => {
    cy.get('[data-testid="sign-up-form-container"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the sign up button, it should display error messages', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Email or Phone Number Хоосон байж болохгүй');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('[data-testid="helperText"]').eq(2).should('exist').should('contain', 'Please re-type your password');
  });

  it('3. When user types on the emailOrPhoneNumber input, error message should disappear', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Email or Phone Number Хоосон байж болохгүй');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.contains('Email or Phone Number Хоосон байж болохгүй').should('not.exist');
  });

  it('4. When user types on the password input, it should display error message saying it has to be more than 8 characters', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('input[name="password"]').type('8000');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password must have at least 8 characters');
  });

  it('5. When user types on the password input with no lowercase letter, it should display error message', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('input[name="password"]').type('12345678');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Your password must have at least 1 lowercase character');
  });
  it('6. When user types on the password input with no uppercase letter, it should display error message', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('input[name="password"]').type('12345678a');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Your password must have at least 1 uppercase character');
  });

  it('7. When password, confirmPassword does not match, it should display error message', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('input[name="password"]').type('12345678aB');
    cy.get('input[name="confirmPassword"]').type('123');
    cy.get('[data-testid="helperText"]').eq(2).should('exist').should('contain', 'Passwords does not match');
  });

  it('8. When password, confirmPassword matchs, it should not display error message', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Password xоосон байж болохгүй');
    cy.get('input[name="password"]').type('12345678aB');
    cy.get('input[name="confirmPassword"]').type('12345678aB');
    cy.get('[data-cy="Login-Button"]').should('not.be.disabled');
  });

  it('9. When user clicks on the login button, it should create new user', () => {
    cy.get('[data-cy="Login-Button"]').should('exist').click();
    cy.get('[data-cy="Login-Button"]').should('be.disabled');
    cy.get('input[name="emailOrPhoneNumber"]').type('8000-1612023');
    cy.get('input[name="password"]').type('12345678aB');
    cy.get('input[name="confirmPassword"]').type('12345678aB');
    cy.get('[data-cy="Login-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Login-Button"]').click();
  });
});

// 1. when user enters no value on the inputs and click on the sign up button, it should display error messages
// 2. when user types on the emailOrPhoneNumber input, error message should disappear
// 3. when user types on the password input, it should display error message saying it has to be more than 8 characters
// 4. when user types on the password input with no lowercase letter, it should display error message
// 5. when user types on the password input with no uppercase letter, it should display error message
// 6. when password, confirmPassword does not match, it should display error message
