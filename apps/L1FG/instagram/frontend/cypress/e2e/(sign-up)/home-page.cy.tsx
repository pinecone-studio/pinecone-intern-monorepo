describe('Home Page', () => {
  it(`Should `, () => {
    cy.visit('/');
    cy.get("[data-cy='hello']").contains("Hello")
  });
});
