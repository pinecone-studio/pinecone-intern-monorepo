describe('RequestsMain feature', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it('1.renders loading state initially', () => {
    cy.get('p').should('contain.text', 'Loading...');
  });
  it('2.render error state correctly', () => {
    const errorMessage = 'error';
    cy.get('p').contains(`Error: ${errorMessage}`).should('exist');
  });
});
