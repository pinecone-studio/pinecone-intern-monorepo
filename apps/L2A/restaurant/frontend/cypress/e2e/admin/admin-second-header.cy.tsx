describe('OrderHeader E2E', () => {
  beforeEach(() => {
    cy.visit('/admin/orders');
  });

  it('renders the order header', () => {
    cy.get('[data-cy="order-header"]').should('exist');
    cy.get('[data-cy="order-title"]').should('contain.text', 'Захиалга');
  });

  it('opens date picker and selects a date', () => {
    cy.get('[data-testid="date-picker-trigger"]').click();
    cy.get('[data-testid="date-picker-calendar"]').should('be.visible');
    cy.get('[data-testid="date-picker-calendar"] button').not('[disabled]').first().click();
  });

  it('opens status picker and selects a status', () => {
    cy.get('[data-testid="status-picker-trigger"]').click();

    cy.get('[data-testid="status-option-ready"]').click();

    cy.get('[data-testid="status-picker-trigger"]').should('contain.text', 'Бэлэн');
  });

  it('can change status multiple times', () => {
    cy.get('[data-testid="status-picker-trigger"]').click();
    cy.get('[data-testid="status-option-pending"]').click();
    cy.get('[data-testid="status-picker-trigger"]').should('contain.text', 'Хүлээгдэж буй');

    cy.get('[data-testid="status-picker-trigger"]').click();
    cy.get('[data-testid="status-option-done"]').click();
    cy.get('[data-testid="status-picker-trigger"]').should('contain.text', 'Дууссан');
  });
});
