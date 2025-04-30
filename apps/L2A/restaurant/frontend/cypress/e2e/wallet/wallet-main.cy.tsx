describe("WalletPage", () => {
    beforeEach(() => {
      cy.visit("/wallet");
    });
  
    it('renders the title "Хэтэвч"', () => {
      cy.contains("Хэтэвч").should("be.visible");
    });
  
    it('displays the balance "18,288"', () => {
      cy.contains("18,288").should("be.visible");
    });
  
    it('shows the label "Үлдэгдэл"', () => {
      cy.contains("Үлдэгдэл").should("be.visible");
    });
  
    it("renders the bottom white section", () => {
      cy.get('[data-testid="wallet-white-section"]').should("exist");
    });
  });
  