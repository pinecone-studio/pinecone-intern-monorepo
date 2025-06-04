
describe('Main page', () => {
  it('renders all main components', () => {
    cy.visit('/'); 

    cy.get('header').should('exist'); 
    cy.get('main').should('exist'); 
    cy.get('footer').should('exist'); 
  });
});