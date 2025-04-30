describe("WalletPage", () => {
    beforeEach(() => {
      cy.visit("/wallet");
    });
  
    it('renders the "Хэтэвч"', () => {
      cy.contains("Хэтэвч").should("be.visible");
      cy.contains("18,288").should("be.visible");
      cy.contains("Үлдэгдэл").should("be.visible");
      cy.get('[data-testid="wallet-white-section"]').should("exist");
    });
  });
  