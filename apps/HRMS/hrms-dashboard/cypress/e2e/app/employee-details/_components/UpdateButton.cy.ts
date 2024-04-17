describe('update button component', () => {
  beforeEach(() => {
    cy.visit('/employee-details');
  });

  it('should update button', () => {
    cy.get('[data-testid="update-button"]').find('svg').should('have.class', 'MuiSvgIcon-root');
    cy.get('[data-testid="update-button"]').should('exist').and('have.text', 'Засварлах');
    cy.get('[data-testid="update-button"]').click();
  });
});
