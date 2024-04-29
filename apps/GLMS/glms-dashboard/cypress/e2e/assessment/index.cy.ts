describe('assessment page', () => {
  beforeEach(() => cy.visit('/assessment'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from GLMS dashboard Assessment Page');
  });
  it('loads successfully', () => {
    cy.visit('/assessment'); 
    cy.contains('hello from GLMS dashboard Assessment Page').should('exist');
  });


  it('navigates to home page when "Go back to home page" button is clicked', () => {
    cy.visit('/assessment');
    cy.get('button').contains('Go back to home page').click();
    cy.url().should('include', '/');
  });
});
