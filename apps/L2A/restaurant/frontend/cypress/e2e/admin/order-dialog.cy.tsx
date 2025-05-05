describe("OrderDialog", () => {
    beforeEach(() => {
      cy.visit("/admin/orders"); 
    });
    it("opens the dialog and displays correct content", () => {
      cy.get('[data-cy="dialog-button"]').first().click();
      cy.get('[data-cy="order-dialog"]').should("exist");
      cy.get('[data-cy="dialog-order-number"]').should("exist").and("not.be.empty");
      cy.get('[data-cy="dialog-table-number"]').should("exist").and("not.be.empty");
      cy.get('[data-cy="dialog-order-time"]').should("contain", "🕒");
      cy.get('[data-cy="dialog-order-foods"]').should("exist");
      cy.get('[data-cy="dialog-total-price"]').should("exist").and("not.be.empty");
    });
    it("displays and interacts with status dropdown", () => {
      cy.get('[data-cy="dialog-button"]').first().click();
      cy.get('[data-cy="dialog-status-trigger"]').click({ force: true });
      cy.get('[data-cy="dialog-status-options"]').within(() => {
        cy.get('[data-cy="dialog-status-ready"]').should("exist");
        cy.get('[data-cy="dialog-status-pending"]').should("exist");
        cy.get('[data-cy="dialog-status-progress"]').should("exist");
        cy.get('[data-cy="dialog-status-done"]').should("exist");
      });
      cy.get('[data-cy="dialog-status-done"]').click();
      cy.get('[data-cy="dialog-status-value"]').should("contain", "Дууссан");
    });
  });
  