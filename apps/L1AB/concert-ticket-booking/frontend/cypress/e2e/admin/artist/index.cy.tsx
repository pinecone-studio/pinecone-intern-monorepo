describe('artist Page', () => {
  it('Should render the Container component', () => {
    cy.visit('/signin');
    cy.get('[data-cy=SignIn-Page]').should('be.visible');
    cy.get('[data-cy=SignIn-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=SignIn-Password-Input]').type('123');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
    cy.get('[data-cy=Artist]').click();
    cy.get('[data-cy="Container"]').should('be.visible');
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="Artist-Component"]').should('be.visible');
    });
  });
});
