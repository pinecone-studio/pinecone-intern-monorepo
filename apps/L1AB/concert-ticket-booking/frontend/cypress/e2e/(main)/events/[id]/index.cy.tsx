describe('Event Details Page', () => {
  it('Should render event details page and show event id', () => {
    const eventId = '6736c80ca0125050e1592545';

    cy.visit(`/events/${eventId}`);

  });
});
