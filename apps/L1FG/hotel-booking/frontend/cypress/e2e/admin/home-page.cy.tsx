describe('admin home page', () => {
  it('should display the admin home page', () => {
    cy.visit('/admin');
    cy.get('p').should('contain', 'Hotels');
  });
});
