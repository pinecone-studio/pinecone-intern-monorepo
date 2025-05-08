describe('WalletPage', () => {
  beforeEach(() => {
    cy.visit('/wallet');
  });

  it('should render wallet-page', () => {
    cy.contains('Хэтэвч').should('be.visible');
    cy.contains('18,288').should('be.visible');
    cy.contains('Үлдэгдэл').should('be.visible');
    cy.get('[data-testid="wallet-white-section"]').should('exist');
  });

  it('should render WalletPayment component', () => {
    cy.contains('+324').should('be.visible');
    cy.contains('24.10.19 15:25').should('be.visible');
    cy.get('[data-testid="wallet-white-section"]').should('be.visible');
  });
});
