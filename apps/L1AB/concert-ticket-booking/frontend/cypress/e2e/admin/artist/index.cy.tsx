describe('artist Page', () => {
  it('Should render the Container component', () => {
    cy.visit('/signin');
    cy.get('[data-cy=SignIn-Page]').should('be.visible');
    cy.get('[data-cy=SignIn-Email-Input]').type('by.dulguun@gmail.com');
    cy.get('[data-cy=SignIn-Password-Input]').type('1234');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
    cy.visit('/admin/artist');
    cy.get('[data-cy="Container"]').should('be.visible');
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="Artist-Component"]').should('be.visible');
    });
  });
});
