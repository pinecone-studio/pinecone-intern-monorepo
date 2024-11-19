describe('Forget-pass-Page', () => {
  beforeEach(() => {
    cy.visit('/forget');
  });
  it('1. Should render signIn', () => {
    cy.get('[data-cy=Forget-pass-Page]').should('be.visible');
  });
  it('2. When user enters all values , it should navigate to main', () => {
    cy.get('[data-cy=Forget-pass-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=Forget-pass-Submit-Button]').click();
  });
});
