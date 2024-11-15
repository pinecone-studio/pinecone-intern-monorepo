describe('Booking Details Page', () => {
    it(`Should render booking details page`, () => {
        const bookingId = '1';
        cy.visit(`/bookings/${bookingId}`);
    });
});
