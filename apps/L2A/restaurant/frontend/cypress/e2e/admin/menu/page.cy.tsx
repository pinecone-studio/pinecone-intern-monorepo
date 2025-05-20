describe("Menu Page Tabs", () => {
  beforeEach(() => {
    cy.visit("/admin/menu");
  });

  it("renders the tab list with both tabs", () => {
    cy.get('[data-testid="menu-tab"]').should("exist");
    cy.get('[data-testid="tabs-list"]').should("exist");
    cy.get('[data-testid="tab-products"]').should("contain", "Цэсний бүтээгдэхүүн");
    cy.get('[data-testid="tab-manage"]').should("contain", "Цэс удирдах");
  });

  it("shows products content by default", () => {
    cy.get('[data-testid="content-products"]').should("be.visible");
    cy.get('[data-testid="content-manage"]').should("not.be.visible");
  });
  
  it("switches to 'Цэс удирдах' tab and shows its content", () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="content-manage"]').should("be.visible");
    cy.get('[data-testid="content-products"]').should("not.be.visible");
  });

  it("switches back to 'Цэсний бүтээгдэхүүн'", () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="tab-products"]').should("be.visible");
    cy.get('[data-testid="content-products"]').click();
  });

});