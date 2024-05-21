describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('displays the header and button', () => {
    cy.contains('h1', 'Ажлын зар').should('exist');
    cy.get('[data-testid="jobAdd-button"]').click();
  });

  it('displays the ad tab', () => {
    cy.contains('Зар').should('exist');
    cy.get('[data-testid="adtab"]').should('be.visible');
  });

  it('displays the offer tab', () => {
    cy.contains('Ирсэн өргөдөл').should('exist');
    cy.get('[data-testid="offertab"]').should('be.visible');
  });

  it('displays the date filter', () => {
    cy.contains('Огноо').should('exist');
    cy.get('[data-testid="date-filter"]').should('be.visible');
  });

  it('displays the status filter', () => {
    cy.contains('Төлөв').should('exist');
    cy.get('[data-testid="status-filter"]').should('be.visible');
  });

  it('navigates to add job page on button click', () => {
    cy.get('[data-testid="jobAdd-button"]').click();
    cy.url().should('include', '/recruiting/add-job');
  });

  it('renders table headers correctly', () => {
    cy.get('[data-cy="jobsList"] th').should('be.visible');
  });
});
