describe('Admin Guests Guest Info Page', () => {
    it(`Should render admin guests guest info page`, () => {
        const guestId = '1';
        cy.visit(`/admin/guests/${guestId}`);
    });
});
