describe('Cancel Page', () => {
  it('should render', () => {
    cy.visit('/signin');
    cy.get('[data-cy=SignIn-Page]').should('be.visible');
    cy.get('[data-cy=SignIn-Email-Input]').type('by.dulguun@gmail.com');
    cy.get('[data-cy=SignIn-Password-Input]').type('1234');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
    cy.visit('/admin/cancel');
    cy.get('[data-cy="Container"]').should('be.visible');
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="Cancel-Component"]').should('be.visible');
    });
  });
});
