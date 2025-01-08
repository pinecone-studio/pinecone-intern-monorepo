describe('requestform page', () => {
  //   after(() => {
  //     deleteTestForm('cypress - test');
  //   });
  it('Should render requestform page', () => {
    cy.visit('/request-form');
    cy.get('[data-cy=request-form-page]').should('be.visible');
    cy.get('[data-cy=request-form-select-input').click();
    cy.get('[data-cy=select-input-paid]').click();
    cy.get('[data-cy=paid-calendar-btn]').click();
    cy.get('.right-1>.lucide').click();
    cy.get(':nth-child(3) > :nth-child(7) > .rdp-button_reset').click();
    cy.get('[data-cy=lead-button]').click();
    cy.get('[data-cy=Option-1]').trigger('keydown', { key: 'Enter' });
    cy.get('[data-cy=notes-input]').type('cypress-test');
    cy.get('[data-cy=paid-submit-button]').click();
    cy.contains('Амжилттай илгээгдлээ').should('not.be.visible');
  });
});
