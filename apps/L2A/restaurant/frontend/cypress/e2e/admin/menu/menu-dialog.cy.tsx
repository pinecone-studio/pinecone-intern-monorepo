describe('MenuDialog Component', () => {
  beforeEach(() => {
    cy.visit('/admin/menu');
  });

  it('opens and submits the discount dialog', () => {
    cy.get('[data-testid="food-actions"]').should('exist');
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="discount-trigger"]').click();
    cy.get('[data-testid="edit-dialog"]').should('exist');
    cy.get('[placeholder="Хямдралын нэр"]').type('Summer Sale');
    cy.get('[placeholder="Хямдралын хувь"]').type('20');
    cy.get('[data-testid="edit-submit"]').click();
  });

  it('opens and submits the menu dialog', () => {
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="menu-trigger"]').click();
    cy.get('[data-testid="menu-dialog"]').should('exist');
    cy.get('[placeholder="Бүтээгдэхүүн нэмэх"]').type('Шинэ пицца');
    cy.get('[data-testid="menu-submit"]').click();
  });
});
