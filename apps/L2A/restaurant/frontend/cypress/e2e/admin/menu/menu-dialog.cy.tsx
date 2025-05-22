describe('MenuDialog Component', () => {
  beforeEach(() => {
    cy.visit('/admin/menu'); 
  });

  it('opens and submits the discount dialog', () => {
    cy.get('Хямдрал').click();
    cy.get('[data-testid="edit-dialog"]').should('be.visible');

    cy.get('input[placeholder="Хямдралын нэр"]').type('Summer Sale');
    cy.get('input[placeholder="Хямдралын хувь"]').type('20');

    cy.get('button').contains('📅').click();
    cy.get('.rdp-day:not(.rdp-day_outside)').first().click();
    cy.get('.rdp-day:not(.rdp-day_outside)').eq(3).click();

    cy.get('[data-testid="edit-submit"]').click();
  });

  it('opens and submits the menu dialog', () => {
    cy.get('[data-testid="menu-trigger"]').click();
    cy.get('[data-testid="menu-dialog"]').should('be.visible');

    cy.get('input[placeholder="Бүтээгдэхүүн нэмэх"]').type('Pizza Margherita');

    cy.get('[data-testid="menu-submit"]').click();
  });
});
