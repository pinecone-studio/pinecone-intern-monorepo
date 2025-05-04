describe("OrderMainCard", () => {
  beforeEach(() => {
    cy.visit("/admin"); 
  });

  it("renders order data correctly", () => {
    cy.get("[data-cy=order-card]").first().within(() => {
      cy.get("[data-cy=table-number]").should("exist");
      cy.get("[data-cy=order-number]").should("exist");
      cy.get("[data-cy=order-time]").should("contain", "🕒");
      cy.get("[data-cy=order-total]").should("contain", "₮");

      cy.get("[data-cy=food-item]").each(($el) => {
        cy.wrap($el).find("img").should("be.visible");
        cy.wrap($el).find("[data-cy=food-name]").should("exist");
        cy.wrap($el).find("[data-cy=food-price]").should("contain", "₮");
        cy.wrap($el).find("[data-cy=food-qty]").should("contain", "ш");
      });

      cy.get("[data-cy=save-button]").should("contain", "Хадгалах");
    });
  });
});
