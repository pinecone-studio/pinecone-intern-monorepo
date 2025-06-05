describe('Admin cancel request process', () => {
  it('should render all cancel requests', () => {
    cy.intercept('POST', '**/api/graphql').as('waitapi');
    cy.visit('/admin/cancel-request');
    cy.wait('@waitapi');
  });

  it('should not render any cancel requests', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: {
          getCancelRequests: [],
        },
      },
    }).as('waitapi');
    cy.visit('/admin/cancel-request');
    cy.wait('@waitapi');
  });
});
