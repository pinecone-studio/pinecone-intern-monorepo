describe('My Requests Page', () => {
  it('should render the RequestStory component with correct dates', () => {
    cy.visit('my-requests');
    cy.contains('Зайнаас ажиллах').should('be.visible');
    const todayDay = new Date().getDate();
    cy.get('[data-cy=date-picker]').click();
    cy.get('[data-cy=calendar-content]').contains(todayDay).click();

    cy.contains('Чөлөө').should('be.visible');
  });
});
