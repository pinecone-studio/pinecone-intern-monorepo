describe('edit an event', () => {
  beforeEach(() => {
    cy.visit('/admin/concerts');
  });
  it('should edit and event and save', () => {
    cy.intercept('POST', '**/api/graphql').as('waitapi');
    cy.intercept('POST', '**/api/graphql').as('waitMutationRes');
    cy.wait('@waitapi');
    cy.get('[data-testid="edit-btn-3"]').click();
    cy.get('[data-testid="edit-event-button-3"]').click();
    cy.wait('@waitMutationRes');
  });
});
