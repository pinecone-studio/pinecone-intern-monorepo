describe('Check In Room Page', () => {
  it('Should render check in room page', () => {
    const room = '1';
    cy.visit(`/check/${room}`);
  });
});
