describe('Home Page', () => {
  
  it(`Should render home page`, () => {
    cy.visit('/');
    cy.get('[data-cy="Show-Comments-1"]').click();

    cy.get('[data-cy="Show-Comments-Caption]').should('be.visible')


  });
});
