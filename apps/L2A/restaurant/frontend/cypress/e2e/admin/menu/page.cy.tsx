describe('MenuPage tabs work correctly', () => {
  beforeEach(() => {
    cy.visit('/admin/menu'); 
  });

  it('renders and shows Цэсний бүтээгдэхүүн tab by default', () => {
    cy.get('[data-testid="menu-tab"]').should('exist');
    cy.get('[data-testid="tabs-list"]').should('exist');
    cy.get('[data-testid="tab-products"]').should('exist');
    cy.get('[data-testid="tab-manage"]').should('exist');

    cy.get('[data-testid="content-products"]').should('be.visible');
    cy.get('[data-testid="content-manage"]').should('not.be.visible');
  });

  it('switches to Цэс удирдах tab correctly', () => {
    cy.get('[data-testid="tab-manage"]').click();

    cy.get('[data-testid="content-manage"]').should('be.visible');
    cy.get('[data-testid="content-products"]').should('not.be.visible');
  });

  it('switches back to Цэсний бүтээгдэхүүн tab', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="tab-products"]').click();

    cy.get('[data-testid="content-products"]').should('be.visible');
    cy.get('[data-testid="content-manage"]').should('not.be.visible');
  });
});
