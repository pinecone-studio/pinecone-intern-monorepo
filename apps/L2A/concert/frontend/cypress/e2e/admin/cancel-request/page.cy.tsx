describe('Admin cancel request process', () => {
  it('should navigate through pages', () => {
    cy.intercept('POST', '**/api/graphql').as('waitapi');
    cy.visit('/admin/cancel-request');
    cy.wait('@waitapi');
  });

  it('should navigate through pages', () => {
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
