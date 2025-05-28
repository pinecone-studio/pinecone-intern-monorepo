describe('ShoppingCart Component', () => {
  beforeEach('should render the shopping cart icon', () => {
    cy.visit('/');
    cy.get('[data-testid="shopping-cart-icon"]').click();
  });

  it('should render the main container', () => {
    cy.get('[data-testid="tom div"]').should('exist');
  });

  it('should render the heading "Захиалгын түүх"', () => {
    cy.get('[data-testid="Захиалгын түүх"]').should('contain.text', 'Захиалгын түүх');
  });

  it('should render all 6 order cards', () => {
    cy.get('[data-testid="cards"] > div').should('have.length', 6);
  });

  it('should display the correct prices', () => {
    const prices = ['42,800₮', '27,450₮', '18,900₮', '21,900₮', '24,200₮', '19,750₮'];
    prices.forEach((price) => {
      cy.contains(price).should('exist');
    });
  });

  it('each card should include status and timestamp', () => {
    cy.get('[data-testid="cards"] > div').each(($el) => {
      cy.wrap($el).within(() => {
        cy.contains('#33998').should('exist');
        cy.contains('Дууссан').should('exist');
        cy.contains('24.10.19 15:25').should('exist');
      });
    });
  });
});
