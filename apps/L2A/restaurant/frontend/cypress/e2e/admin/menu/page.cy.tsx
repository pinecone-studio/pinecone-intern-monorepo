describe('MenuPage Tabs', () => {
  beforeEach(() => {
    cy.visit('/admin/menu');
  });

  it('shows default tab correctly', () => {
    cy.get('[data-testid="tab-products"]').should('exist');
    cy.get('[data-testid="tab-products"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-testid="content-products"]').should('be.visible');
    cy.get('[data-testid="content-manage"]').should('not.be.visible');
  });

  it('switches tabs correctly', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="tab-manage"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-testid="content-manage"]').should('be.visible');
    cy.get('[data-testid="content-products"]').should('not.be.visible');

    cy.get('[data-testid="tab-products"]').click();
    cy.get('[data-testid="tab-products"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-testid="content-products"]').should('be.visible');
    cy.get('[data-testid="content-manage"]').should('not.be.visible');
  });
});
