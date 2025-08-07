describe('Create Post', () => {
     beforeEach(() => {
    cy.visit('/create');
  });
    it('1) renders the create post UI properly', () => {
    cy.contains('h1', 'Post').should('be.visible');
    cy.get('div').should('have.css', 'margin', '80px 0px 0px 536px');
      
    });
});
