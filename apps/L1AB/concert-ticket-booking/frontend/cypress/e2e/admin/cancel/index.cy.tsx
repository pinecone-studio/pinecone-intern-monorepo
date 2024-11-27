describe('Cancel Page', () => {
  beforeEach(() => {
    cy.visit('/admin/cancel');
  });

  it('Should render the Container component', () => {
    cy.get('[data-cy="Container"]').should('be.visible');
  });

  it('Should render the CancelComponent inside the Container', () => {
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="Cancel-Component"]').should('be.visible');
    });
  });

  it('Should render the AdvertisedEvent component inside the Container', () => {
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="AdvertisedEvent-Component"]').should('be.visible');
    });
  });
});
