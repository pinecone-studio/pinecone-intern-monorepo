describe('RecoveryEmail-Page', () => {
  beforeEach(() => {
    cy.visit('/recovery');
  });

  it('should show validation errors for invalid email input', () => {
    cy.get('input[type="email"]').type('invalid-email');

    cy.get('button').contains('Үргэлжлүүлэх').click();
  });
});
