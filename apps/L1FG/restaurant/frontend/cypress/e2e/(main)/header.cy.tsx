describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('/order/1'); 
  });

  it('should render the icons', () => {
    cy.get('div.flex.gap-3.items-center')
      .find('svg') 
      .should('have.length', 3); 
  });
});
