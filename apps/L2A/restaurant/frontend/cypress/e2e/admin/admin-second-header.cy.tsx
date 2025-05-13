describe("OrderHeader component", () => {
  beforeEach(() => {
    cy.visit("/admin/orders"); 
  });

  it("should display the correct title", () => {
    cy.get('[data-cy="order-title"]').should("contain", "Захиалга");
  });

  it("should open the date picker and select a date", () => {
    cy.get('[data-testid="date-picker-trigger"]').click();
    cy.get('[data-cy="date-picker-calendar"]').should("be.visible");
    cy.get('[data-testid="date-picker-calendar"]')
      .contains("15")
      .click();
    cy.get("body").click(0, 0); 
  });

  it("should open the status dropdown and select a status", () => {
    cy.get('[data-testid="status-picker-trigger"]').click();
    cy.get('[data-testid="status-option-ready"]').should("be.visible");
    cy.get('[data-cy="status-option-inprogress"]').click();
    cy.get('[data-cy="status-picker-trigger"]').should("contain", "Хийгдэж буй");
  });
});
