describe('Admin Body Tests', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });
  it('should show the admin header', () => {
    cy.get('[data-testid="admin-header"]').should('exist');
  });
  it('should show all menu items', () => {
    cy.get('[data-testid="nav-item-Orders"]').should('be.visible');
    cy.get('[data-testid="nav-item-Menu"]').should('be.visible');
    cy.get('[data-testid="nav-item-Food"]').should('be.visible');
    cy.get('[data-testid="nav-item-Table"]').should('be.visible');
  });
  it('should go to correct pages when clicking menu items', () => {
    cy.get('[data-testid="nav-item-Menu"]').click();
    cy.url().should('include', '/admin/menu');
    cy.get('[data-testid="nav-item-Food"]').click();
    cy.url().should('include', '/admin/food');
    cy.get('[data-testid="nav-item-Table"]').click();
    cy.url().should('include', '/admin/table');
  });
  it('should show avatar with right image', () => {
    cy.get('[data-testid="avatar-image"]').should('exist').should('have.attr', 'src', 'https://github.com/shadcn.png');
  });
});
