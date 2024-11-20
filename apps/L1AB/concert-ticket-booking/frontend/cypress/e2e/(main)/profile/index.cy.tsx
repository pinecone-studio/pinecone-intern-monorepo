describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('Should render the Container component', () => {
    cy.get('[data-cy="Container"]').should('be.visible');
  });

  it('Should render the ForgetPassword component inside the Container', () => {
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="ForgetPasswordComponent"]').should('be.visible');
    });
  });
});
