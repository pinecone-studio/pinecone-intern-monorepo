describe("OrderHeader", () => {
    beforeEach(() => {
      cy.visit("/admin/orders"); 
    });
    it("should display the title", () => {
      cy.get("[data-cy=order-title]").should("contain", "Захиалга");
    });
    it("should open date picker and select a date", () => {
      cy.get("[data-cy=date-picker-trigger]").click();
      cy.get("[data-cy=date-picker-calendar]").should("exist");
      cy.get("[data-cy=date-picker-calendar] button").first().click(); 
    });
    it("should open status dropdown and select a status", () => {
      cy.get("[data-cy=status-picker-trigger]").click();
      cy.get("[data-cy=status-option-ready]").click();
      cy.get("[data-cy=status-picker-trigger]").should("contain", "Бэлэн");
    });
  });
  