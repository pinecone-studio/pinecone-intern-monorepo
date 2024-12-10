describe('artist Page', () => {
    beforeEach(() => {
      cy.visit('/admin/artist');
    });
  
    it('Should render the Container component', () => {
      cy.get('[data-cy="Container"]').should('be.visible');
    });
  
    it('Should render the artistComponent inside the Container', () => {
      cy.get('[data-cy="Container"]').within(() => {
        cy.get('[data-cy="Artist-Component"]').should('be.visible');
      });
    });
  });
  