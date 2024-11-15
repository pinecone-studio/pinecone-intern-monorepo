describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('1. Should render sign-up', () => {
    cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
  });

  it('2. When user does not enter email or mobile number, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-mobileNumberorEmail-Input]').type('12');
    cy.get('[data-cy=Sign-Up-mobileNumberorEmail-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-mobileNumberorEmail-Input-Error-Message]').should('have.text','Invalid email or mobile number');
  });

  it('3. When user does not enter password, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-password-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-password-Input-Error-Message]').should('have.text','Password must be at least 8 characters');
  }); 

  it('4. When user enters invalid fullname, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-fullname-Input]').type('12');
    cy.get('[data-cy=Sign-Up-fullname-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-fullname-Input-Error-Message]').should('have.text', 'Full name must be at least 3 characters');
  });

  it('5. When user does not enter username, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-username-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-username-Input-Error-Message]').should('have.text','Username must be at least 3 characters');
  });

  it('5. when user enters all values, it should navigate to login page', () => {

    cy.get('[data-cy=Sign-Up-mobileNumberorEmail-Input]').type('test@gmail.com');
    cy.get('[data-cy=Sign-Up-Password-Input]').type('12345678');
    cy.get('[data-cy=Sign-Up-fullname-Input]').type('Test');
    cy.get('[data-cy=Sign-Up-username-Input]').type('Test');
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.url().should('include', 'login');
  });
});
