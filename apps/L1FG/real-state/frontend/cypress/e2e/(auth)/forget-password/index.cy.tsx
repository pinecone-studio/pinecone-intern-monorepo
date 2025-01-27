describe('Forget password page', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
  });

  it('1.it should successful request', () => {
    cy.get('[data-cy="Forget-Password-Page" ]').should('exist');
    cy.get('[data-cy="Forget-Password-Page-Email-Input"]').type('jamka888@gmail');
    cy.get('[data-cy="Forget-Password-Page-Submit-Button"]').click();
    cy.visit('/change-password');
  });

  it('2.it should unsuccessful request', () => {
    cy.get('[data-cy="Forget-Password-Page" ]').should('exist');
    cy.get('[data-cy="Forget-Password-Page-Email-Input"]').type('00000');
    cy.get('[data-cy="Forget-Password-Page-Submit-Button"]').click();
  });
});
