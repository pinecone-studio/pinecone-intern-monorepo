describe('HomeOrder E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show step 1 content with cart item', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });
    cy.contains('Таны захиалга').should('be.visible');
    cy.get('[data-testid="cart-item"]').should('exist');
    cy.contains('Taco Taco').should('exist');
    cy.contains('15.6k').should('exist');
    cy.get('[data-testid="order-button"]').should('be.visible');
  });

  it('should go to step 2 when clicking the order button', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });
    cy.get('[data-testid="order-button"]').click();
    cy.contains('Next step content goes here.').should('be.visible');
  });
});
