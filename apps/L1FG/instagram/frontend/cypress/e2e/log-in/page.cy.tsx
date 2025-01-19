describe('Login', () => {
  beforeEach(() => {
    cy.visit('/log-in');
  });
  it('Should render', () => {
    cy.get('[data-cy=login-form]').should('be.visible');
  });

  it('Should login', () => {
    cy.get('[data-cy=login-email-input]').type('cypress4@gmail.com');
    cy.get('[data-cy=login-password-input]').type('1234');
    cy.get('[data-cy=login-submit-button]').click();
    cy.contains('Амжилттай нэвтэрлээ').should('be.visible');
  });
});
