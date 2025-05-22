describe('Menu Manage Tab', () => {
  beforeEach(() => {
    cy.visit('/admin/menu');
  });
  it('should render the menu manage tab', () => {
    cy.get('[data-testid="tab-manage"]').click();
  });
  it('should render the tab list and show AllCategory by default', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="menu-tab"]').should('exist');
    cy.get('[data-testid="all-menu"]').should('exist');
    cy.get('[data-testid="tabs-list"]').should('be.visible');

    cy.get('[data-testid="all"]').parent().next().should('exist');
    cy.get('[data-testid="all"]').should('have.attr', 'data-state', 'active');
    cy.get('[data-testid="menu2"]').should('have.attr', 'data-state', 'inactive');
    cy.get('[data-testid="discount2"]').should('have.attr', 'data-state', 'inactive');
  });

  it('should switch to MenuList when Цэс tab is clicked', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="menu1"]').click();
    cy.get('[data-testid="menu1"]').should('have.attr', 'data-state', 'active');
    cy.get('[data-testid="all"]').should('have.attr', 'data-state', 'inactive');

    cy.get('[data-testid="menu1"]').parent().next().should('exist');
  });

  it('should switch to DiscountList when Хямдрал tab is clicked', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="discount1"]').click();

    cy.get('[data-testid="discount2"]').should('have.attr', 'data-state', 'active');
    cy.get('[data-testid="menu2"]').should('have.attr', 'data-state', 'inactive');

    cy.get('[data-testid="discount1"]').parent().next().should('exist');
  });
});