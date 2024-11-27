describe('Hotel Details Page', () => {
    it(`Should render hotel details page`, () => {
        const hotelId = '1';
        cy.visit(`/hotels/${hotelId}`);
    });
});
