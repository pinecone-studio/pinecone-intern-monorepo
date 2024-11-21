describe('Event Details Page', () => {
  it('Should render event details page and show event id', () => {
    const eventId = '1';

    cy.visit(`/events/${eventId}`);

    cy.get('p').should('contain.text', `Id: ${eventId}`);
  });
});
