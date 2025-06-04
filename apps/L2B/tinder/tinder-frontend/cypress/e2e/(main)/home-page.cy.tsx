
describe('Main page', () => {
  it('renders all main components', () => {
    cy.visit('/'); 

    cy.get('[data-testid="container"]').should('be.visible');

  });
});

