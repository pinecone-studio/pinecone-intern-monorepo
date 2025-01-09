describe('pending page', () => {
  //   after(() => {
  //     deleteTestForm('cypress - test');
  //   });
  it('Should render requestform page', () => {
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
  });
});
