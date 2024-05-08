describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('displays the header and button', () => {
    cy.contains('h1', 'Ажлын зар').should('exist');
    cy.get('[data-testid="jobAdd-button"]').click();
  });

  it('shows information about job advertisement', () => {
    cy.contains('p', 'Зар').should('exist');
    cy.contains('p', 'Ирсэн өргөдөл').should('exist');
  });
  it('navigates to add job page on button click', () => {
    cy.get('[data-testid="jobAdd-button"]').click();
    cy.url().should('include', '/recruiting/add-job');
  });
});
