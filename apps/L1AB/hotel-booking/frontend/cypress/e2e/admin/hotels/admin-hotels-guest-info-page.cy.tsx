describe('Admin Hotels Guest Info Page', () => {
  it(`Should render admin hotels guest info page`, () => {
    const hotelId = '1';
    const roomId = '11';
    const guestId = '111';
    cy.visit(`/admin/hotels/${hotelId}/${roomId}/${guestId}`);
  });
});
