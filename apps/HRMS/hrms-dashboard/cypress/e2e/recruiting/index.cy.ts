describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('displays the header and button', () => {
    cy.contains('Зар нэмэх').should('exist');
    cy.get('[data-testid="jobAdd-button"]').click();
  });

  it('navigates to add job page on button click', () => {
    cy.get('[data-testid="jobAdd-button"]').click();
    cy.url().should('include', '/recruiting/add-job');
  });

  it('renders table headers correctly', () => {
    cy.get('[data-cy="jobsList"] th').should('be.visible');
  });
});
