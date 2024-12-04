describe('artist Page', () => {
  beforeEach(() => {
    cy.visit('/admin/artist'); 
  });

  it('Should render the Container component', () => {
    cy.get('[data-cy="Container"]') // Select the Container by data-cy
      .should('exist') // Verify it exists
      
  });

  it('Should render child elements inside the Container', () => {
    cy.get('[data-cy="Container"]')
    
      
      .and('be.visible'); // Ensure the child element is also visible
  });
});
