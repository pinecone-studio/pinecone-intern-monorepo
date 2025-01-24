describe('Change password page', () => {
  beforeEach(() => {
    cy.visit('/change-password');
  });

  it('1.it should successful request', () => {
    cy.get('[data-cy="Change-Password-Page" ]').should('exist');
    cy.get('[data-cy="Change-Password-Page-Password-Input"]').type('00000000');
    cy.get('[data-cy="Change-Password-Page-Confirm-Password-Input"]').type('00000000');
    cy.get('[data-cy="Change-Password-Page-OTP-Input"]').type('000000');
    cy.get('[data-cy="Change-Password-Page-Button"]').click();
    cy.visit('/change-password');
  });
});
