describe("OrderSecondCard", () => {
    beforeEach(() => {
      cy.visit("/admin");
    });
    it("should display order card with table number, order number, and total", () => {
      cy.get('[data-cy="order-card"]').first().within(() => {
        cy.get('[data-cy="table-number"]').should("exist").and("not.be.empty");
        cy.get('[data-cy="order-number"]').should("exist").and("not.be.empty");
        cy.get('[data-cy="order-time"]').should("contain", "🕒");
        cy.get('[data-cy="order-total"]').should("contain", "Нийлбэр дүн");
      });
    });
    it("should open dialog when 'Дэлгэрэнгүй харах' button is clicked", () => {
      cy.get('[data-cy="dialog-button"]').first().click();
      cy.get('[role="dialog"]').should("exist");
      cy.get('[role="dialog"]').within(() => {
        cy.contains("Нийлбэр дүн").should("be.visible");
      });
    });
    it("should display status select dropdown", () => {
      cy.get('[data-cy="select-status"]')
    });
  });
  