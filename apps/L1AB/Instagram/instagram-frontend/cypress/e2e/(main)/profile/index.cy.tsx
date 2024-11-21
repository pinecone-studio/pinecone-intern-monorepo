describe('Profile Page', () => {
  afterEach(() => {
    it(`Should render profile page`, () => {
      cy.visit('/profile');
    });
  });
});
