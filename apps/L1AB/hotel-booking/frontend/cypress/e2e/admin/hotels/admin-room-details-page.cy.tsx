describe('Admin Room Details Page', () => {
  it(`Should render admin room details page`, () => {
    const hotelId = '1';
    const roomId = '11';
    cy.visit(`/admin/hotels/${hotelId}/${roomId}`);
  });
});
