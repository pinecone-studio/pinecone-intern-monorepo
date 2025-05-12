describe('create account page', () => {
  beforeEach(() => {
    cy.visit('/auth/create-account');
  });
  it('1. Should render error when not selected', () => {
    cy.contains('Next').click();
  });

  it('2. Should go next step', () => {
    cy.contains('Select').click();
    cy.contains('Male').click();
    cy.contains('Next').click();
  });
});
