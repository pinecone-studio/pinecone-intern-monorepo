describe('Button Click Test', () => {
  it('opens modal when clicked', () => {
    cy.get('/employee-details');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('exist');
  });

  it('submits form successfully', () => {
    cy.get('/employee-details');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('button[type="submit"]').click();
  });

  it('displays error messages on invalid form submission', () => {
    cy.get('/employee-details');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('button[type="submit"]').click();
  });
});
