describe('SignUp-Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('1. Should render SignUp page', () => {
    cy.get('[data-cy=SignUp-Page]').should('be.visible');
  });

  it('2. Should allow user to enter all input values', () => {
    cy.get('[data-cy=SignUp-Name-Input]').type('John Doe');
    cy.get('[data-cy=SignUp-Name-Input]').should('have.value', 'John Doe');

    cy.get('[data-cy=SignUp-Phone-Input]').type('1234567890');
    cy.get('[data-cy=SignUp-Phone-Input]').should('have.value', '1234567890');

    cy.get('[data-cy=SignUp-Email-Input]').type('john.doe@example.com');
    cy.get('[data-cy=SignUp-Email-Input]').should('have.value', 'john.doe@example.com');

    cy.get('[data-cy=SignUp-Password-Input]').first().type('password123');
    cy.get('[data-cy=SignUp-Password-Input]').first().should('have.value', 'password123');

    cy.get('[data-cy=SignUp-ConfirmPassword-Input]').last().type('password123');
    cy.get('[data-cy=SignUp-ConfirmPassword-Input]').last().should('have.value', 'password123');
  });

  it('3. Should toggle password visibility when icons are clicked', () => {
    cy.get('[data-cy=SignUp-Password-Input]').first().type('password123');

    cy.get('[data-cy=SignUp-Password-Input]').first().should('have.attr', 'type', 'password');

    cy.get('[data-cy=SignUp-Password-Input-Icons]').first().click();
    cy.get('[data-cy=SignUp-Password-Input]').first().should('have.attr', 'type', 'text');

    cy.get('[data-cy=SignUp-Password-Input-Icons]').first().click();
    cy.get('[data-cy=SignUp-Password-Input]').first().should('have.attr', 'type', 'password');
  });

  it('4. Should navigate to another page when the footer link is clicked', () => {
    cy.get('[data-cy=SignUp-Link]').click();
  });
});
