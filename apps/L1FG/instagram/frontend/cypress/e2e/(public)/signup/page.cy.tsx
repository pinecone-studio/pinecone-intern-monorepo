describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });
  it(`Should render signup page`, () => {
    cy.get('[data-cy=signup-form]').should('be.visible');
  });
  it.only('Should successfully signup', () => {
    cy.get('[data-cy=signup-email-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=signup-password-input]').type('1234');
    cy.get('[data-cy=signup-fullName-input]').type('ankhaa');
    cy.get('[data-cy=signup-userName-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains('Амжилттай бүртгэгдлээ').should('be.visible');
    cy.location('pathname').should('equal', '/login');
  });
  it('Should throw duplicate email error', () => {
    cy.get('[data-cy=signup-email-input]').type('cypress@gmail.com');
    cy.get('[data-cy=signup-password-input]').type('1234');
    cy.get('[data-cy=signup-fullName-input]').type('hi hi');
    cy.get('[data-cy=signup-userName-input]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains('Имэйл хэрэглэгдсэн байна !').should('be.visible');
  });
  it('Should throw duplicate username error', () => {
    cy.get('[data-cy=signup-email-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=signup-password-input]').type('1234');
    cy.get('[data-cy=signup-fullName-input]').type('hi hi');
    cy.get('[data-cy=signup-userName-input]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains('Нэр хэрэглэгдсэн байна !').should('be.visible');
  });
});
