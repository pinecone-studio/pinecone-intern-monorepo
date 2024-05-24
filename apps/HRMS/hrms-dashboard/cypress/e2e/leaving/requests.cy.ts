describe('Requests feature', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it('should display loading spinner while data is loading', () => {
    cy.get('.loading-spinner').should('exist');
  });

  it('should display requests data when loaded', () => {
    cy.get('.loading-spinner').should('not.exist');
    cy.get('[data-testid="requests"]').should('have.length.gt', 0);
  });

  it('should filter requests by today', () => {
    cy.get('.loading-spinner').should('not.exist');
    cy.get('[data-testid="requests"]').should('have.length.gt', 0);

    cy.get('[data-testid="filter-by-today"]').click();
  });

  it('should navigate to request detail page when clicked', () => {
    cy.get('.loading-spinner').should('not.exist');
    cy.get('[data-testid="requests"]').should('have.length.gt', 0);

    cy.get('[data-testid="requests"]').first().click();
    cy.location('pathname').should('contain', '/leaving/Detail');
  });

  it('should refetch requests when refetch function is called', () => {
    cy.get('.loading-spinner').should('not.exist');
    cy.get('[data-testid="requests"]').should('have.length.gt', 0);
  });

  it("should display today's date in the header", () => {
    const today = new Date().toISOString().split('T')[0];
    cy.contains(today).should('exist');
  });
});
