describe("OrderSecondCard Component", () => {
  beforeEach(() => {
    cy.visit("/admin/orders");
  });

  it("renders order data correctly", () => {
    cy.get("[data-cy=order-card]").should("exist");
    cy.get("[data-cy=table-number]").should("not.be.empty");
    cy.get("[data-cy=order-number]").should("not.be.empty");
    cy.get("[data-cy=order-time]").should("contain.text", "🕒");
  });

  it("clicks the detail button", () => {
    cy.get("[data-cy=save-button]").should("be.visible");
  });
});
