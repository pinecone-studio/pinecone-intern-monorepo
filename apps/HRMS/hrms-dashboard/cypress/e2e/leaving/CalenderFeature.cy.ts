describe('assessment page', () => {
    beforeEach(() => cy.visit('/leaving'));
  
    it('1. should select radio button with value of Days or DayOff and move to next step', () => {
      cy.get('button[data-cy="calendarPrevMonth"]').should('not.be.disabled').click();
      cy.get('button[data-cy="calendarNextMonth"]').should('not.be.disabled').click();
    });
  });
  