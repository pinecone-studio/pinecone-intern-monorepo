describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });
  it(`Should render signup page`, () => {
    cy.get('[data-cy=signup-form]').should('be.visible');
  });
  it.only('Should successfully signup', () => {
    cy.get('[data-cy=signup-email-input]').type(`${Date.now()}@gmail.com`);
    cy.get('[data-cy=signup-password-input]').type('1234');
    cy.get('[data-cy=signup-fullName-input]').type('ankhaa');
    cy.get('[data-cy=signup-userName-input]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains('Амжилттай бүртгэгдлээ').should('be.visible');
  });
  it('Should throw duplicate email error', () => {
    cy.get('[data-cy=signup-email-input]').type('cypress@gmail.com');
    cy.get('[data-cy=signup-password-input]').type('1234');
    cy.get('[data-cy=signup-fullName-input]').type('hi hi');
    cy.get('[data-cy=signup-userName-input]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains('Бүртгэл амжилтгүй').should('be.visible');
  });
});
