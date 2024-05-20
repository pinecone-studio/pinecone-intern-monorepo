describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('displays the header and button', () => {
    cy.contains('h1', 'Ажлын зар').should('exist');
    cy.get('[data-testid="jobAdd-button"]').should('exist');
  });

  it('navigates to add job page on button click', () => {
    cy.get('[data-testid="jobAdd-button"]').click();
    cy.url().should('include', '/recruiting/add-job');
  });

  it('shows the correct tabs and allows switching between them', () => {
    cy.get('[data-testid="jobs-button"]').should('exist').and('contain', 'Зар');
    cy.get('[data-testid="applicants-button"]').should('exist').and('contain', 'Ирсэн өргөдөл');

    cy.get('[data-testid="jobs-table"]').should('exist');
    cy.get('[data-testid="applications-table"]').should('not.exist');

    cy.get('[data-testid="applicants-button"]').click();
    cy.get('[data-testid="applications-table"]').should('exist');
    cy.get('[data-testid="jobs-table"]').should('not.exist');

    cy.get('[data-testid="jobs-button"]').click();
    cy.get('[data-testid="jobs-table"]').should('exist');
    cy.get('[data-testid="applications-table"]').should('not.exist');
  });

  it('renders jobs table correctly', () => {
    cy.get('[data-testid="jobs-table"]').within(() => {
      cy.get('th').should('be.visible');
    });
  });

  it('renders applicants table correctly when selected', () => {
    cy.get('[data-testid="applicants-button"]').click();
    cy.get('[data-testid="applications-table"]').within(() => {
      cy.get('th').should('be.visible');
    });
  });
});
