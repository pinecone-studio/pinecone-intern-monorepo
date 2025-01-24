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
    cy.location('pathname').should('equal', '/home');
  });
  it('Should throw password incorrect error', () => {
    cy.get('[data-cy=login-email-input]').type('cypress4@gmail.com');
    cy.get('[data-cy=login-password-input]').type('12345');
    cy.get('[data-cy=login-submit-button]').click();
    cy.contains('Пассворд буруу байна').should('be.visible');
  });
  it('Should throw unsigned up error', () => {
    cy.get('[data-cy=login-email-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=login-password-input]').type('12345');
    cy.get('[data-cy=login-submit-button]').click();
    cy.contains('Бүртгэлгүй байна').should('be.visible');
  });
});
