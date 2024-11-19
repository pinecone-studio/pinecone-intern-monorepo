describe('Admin Hotel Details Page', () => {
  it(`Should render admin hotel details page`, () => {
    const hotelId = '1';
    cy.visit(`/admin/hotels/${hotelId}`);
  });
});
