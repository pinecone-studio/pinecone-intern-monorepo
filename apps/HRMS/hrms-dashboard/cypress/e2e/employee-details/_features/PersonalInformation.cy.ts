describe('Button Click Test', () => {
  it('opens modal when clicked', () => {
    cy.visit('/employee-details/update/66389a107bc2c1b3a29a5585');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('exist');
  });

  it('submits form successfully', () => {
    cy.visit('/employee-details/update/66389a107bc2c1b3a29a5585');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('button[type="submit"]').click();
  });

  it('displays error messages on invalid form submission', () => {
    cy.visit('/employee-details/update/66389a107bc2c1b3a29a5585');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('button[type="submit"]').click();
  });
});
