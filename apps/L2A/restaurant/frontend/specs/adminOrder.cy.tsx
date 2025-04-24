describe("OrderHeader Component", () => {
    beforeEach(() => {
      cy.visit("/admin");
    });
  
    it("renders the title and default button", () => {
      cy.contains("Захиалга").should("be.visible");
      cy.contains("Өнөөдөр").should("be.visible");
    });
  
    it("opens calendar popover when button is clicked", () => {
      cy.contains("Өнөөдөр").click();
      cy.get("[role='dialog']").should("be.visible");
    });
  
    it("selects a date and updates button label", () => {
      cy.contains("Өнөөдөр").click();
  
      cy.get("[role='dialog'] button")
        .not("[disabled]")
        .first()
        .click();
  
      cy.get("button")
        .should("not.contain", "Өнөөдөр")
        .invoke("text")
        .should("match", /\d{4}-\d{2}-\d{2}/); 
    });
  });
  