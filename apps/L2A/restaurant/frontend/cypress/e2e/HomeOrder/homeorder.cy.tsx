describe('HomeOrder E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render order section and cart item', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.contains('Таны захиалга').should('exist');
        cy.get('[data-testid="cart-item"]').should('exist');
      });
  });

  it('should open dialog and show dine/takeaway options', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.get('[data-testid="order-button"]').click();

        cy.contains('Зааланд суух эсэх').should('be.visible');
        cy.get('[data-testid="radio-dinein"]').should('exist');
        cy.get('[data-testid="radio-takeaway"]').should('exist');
      });
   
  });

  it('should select dine-in and redirect to /', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.get('[data-testid="order-button"]').click();
        cy.get('[data-testid="radio-dinein"]').click();
      
        cy.location('pathname', { timeout: 3000 }).should('eq', '/');
      });
 
  });
  
  it('should select takeaway and redirect to /', () => {
    cy.get('[data-cy="Foods"]')
    .first()
    .click({ force: true })
    .then(() => {
      cy.get('[data-testid="order-button"]').click();
      cy.get('[data-testid="radio-takeaway"]').click();
    
      cy.location('pathname', { timeout: 3000 }).should('eq', '/');
    });
    
 
  });

  it('should close the dialog using close button', () => {
    cy.get('[data-cy="Foods"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.get('[data-testid="order-button"]').click();
        cy.get('[data-testid="close-dialog"]').click();
        cy.contains('Зааланд суух эсэх').should('exist'); 
      });
   
  });
});



