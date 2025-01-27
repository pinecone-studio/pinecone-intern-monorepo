describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should render', () => {
    cy.get('[data-cy=login-form]', { timeout: 30000 }).should('be.visible');
  });

  it('Should login', () => {
    cy.login('cypress4@gmail.com', '1234');
    cy.location('pathname').should('equal', '/');
  });

  it('Should throw password incorrect error', () => {
    // cy.get('[data-cy=login-email-input]').type('cypress4@gmail.com');
    cy.getByData('login-email-input').type('cypress4@gmail.com');
    cy.get('[data-cy=login-password-input]').type('12345');
    cy.get('[data-cy=login-submit-button]').click();
    cy.contains('Пассворд буруу байна', { timeout: 30000 }).should('be.visible');
  });

  it('Should throw unsigned up error', () => {
    cy.get('[data-cy=login-email-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=login-password-input]').type('12345');
    cy.get('[data-cy=login-submit-button]').click();
    cy.contains('Бүртгэлгүй байна', { timeout: 30000 }).should('be.visible');
  });
});
