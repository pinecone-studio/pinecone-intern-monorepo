describe('MenuTab', () => {
  beforeEach(() => {
    cy.visit('/admin/menu');
  });

  it('renders the tab component and both tabs', () => {
    cy.get('[data-testid="menu-tab"]').should('exist');
    cy.get('[data-testid="Table"]').should('exist');
    cy.get('[data-testid="tabs-list"]').should('exist');
    cy.get('[data-testid="tab-products"]').should('contain.text', 'Цэсний бүтээгдэхүүн');
    cy.get('[data-testid="tab-manage"]').should('contain.text', 'Цэс удирдах');
  });

  it("shows food cards in the 'Цэсний бүтээгдэхүүн' tab", () => {
    cy.get('[data-testid="content-products"]').should('be.visible');
  });

  it("switches to the 'Цэс удирдах' tab and displays content", () => {
    cy.get('[data-testid="tab-manage"]').click();
  });

  it("switches back to 'Цэсний бүтээгдэхүүн' tab", () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="tab-products"]').click();
    cy.get('[data-testid="content-products"]').should('be.visible');
  });
});
