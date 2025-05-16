describe('CartItem E2E test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders all item info', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });

    cy.get('[data-testid="cart-item"]').should('exist');
    cy.get('[data-testid="zurag"]').should('have.attr', 'alt', 'Taco Taco');
    cy.get('[data-testid="ner"]').should('have.text', 'Taco Taco');
    cy.get('[data-testid="une"]').should('have.text', '15.6k');
    cy.get('[data-testid="amount"]').should('have.text', '1');
  });

  it('increases quantity with plus button', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });

    cy.get('[data-testid="plus-button"]').click();
    cy.get('[data-testid="amount"]').should('have.text', '2');
  });

  it('decreases quantity with minus button but not below 1', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });

    cy.get('[data-testid="minus-button"]').click();
    cy.get('[data-testid="amount"]').should('have.text', '1');
    cy.get('[data-testid="plus-button"]').click();
    cy.get('[data-testid="amount"]').should('have.text', '2');

    cy.get('[data-testid="minus-button"]').click();
    cy.get('[data-testid="amount"]').should('have.text', '1');
  });
});
