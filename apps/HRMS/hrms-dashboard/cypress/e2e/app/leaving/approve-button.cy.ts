describe('ApproveButton', () => {
  it('successfully approves request and navigates to leaving page', () => {
    const id = Cypress._.uniqueId('requestId_');

    cy.visit('/leaving/Detail');

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ApproveRequestMutation') {
        expect(req.body.variables.id).to.eq(id);
        req.reply({ fixture: 'approveRequestSuccess.json' });
      }
    }).as('approveRequest');

    cy.get('[data-testid=approve-button]').click();

    cy.wait('@approveRequest');

    cy.url().should('include', '/leaving');
  });
});
