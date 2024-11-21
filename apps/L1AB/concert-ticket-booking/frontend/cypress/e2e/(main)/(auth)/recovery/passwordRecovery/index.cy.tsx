describe('PasswordRecovery-Page', () => {
  beforeEach(() => {
    cy.visit('/recovery/passwordRecovery');
  });

  it('should render PasswordRecovery component', () => {
    cy.get('[data-cy=PasswordRecovery-Page]').should('be.visible');
  });

  it('should allow user to type password and confirm password', () => {
    cy.get('[data-cy=PasswordRecovery-Input]').first().type('NewPassword123');

    cy.get('[data-cy=PasswordRecovery-comfirm-Input]').last().type('NewPassword123');

    cy.get('[data-cy=PasswordRecovery-Input]').first().should('have.value', 'NewPassword123');
    cy.get('[data-cy=PasswordRecovery-comfirm-Input]').last().should('have.value', 'NewPassword123');
  });

  it('should submit the form when the submit button is clicked', () => {
    cy.get('[data-cy=PasswordRecovery-Input]').first().type('NewPassword123');
    cy.get('[data-cy=PasswordRecovery-comfirm-Input]').last().type('NewPassword123');

    cy.get('[data-cy=PasswordRecovery-Submit-Button]').click();
  });
});
