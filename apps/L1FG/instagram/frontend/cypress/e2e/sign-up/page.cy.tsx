describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });
  it(`Should render signup page`, () => {
    cy.get('[data-cy=signup-form]').should('be.visible');
  });
  it('Should successfully signup', () => {
    cy.get('[type="email"]').type('cypress1@gmail.com');
    cy.get('[type="password"]').type('1234');
    cy.get('[placeholder="Full Name"]').type('hi hi');
    cy.get('[placeholder="Username"]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
  });
  it('Should throw duplicate email error', () => {
    cy.get('[type="email"]').type('cypress@gmail.com');
    cy.get('[type="password"]').type('1234');
    cy.get('[placeholder="Full Name"]').type('hi hi');
    cy.get('[placeholder="Username"]').type('hi_');
    cy.get('[data-cy=sign-up-button]').click();
  });
});
