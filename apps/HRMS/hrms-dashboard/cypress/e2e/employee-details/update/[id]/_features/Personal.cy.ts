describe('update personal info', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('1.Should visit to update page', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.url().should('include', 'update');
    cy.get('[data-testid="personal-info"]').should('exist').should('be.visible');
    cy.get('[data-testid="profile-picture"]').should('exist').should('be.visible');
  });
  it('Cancel icon', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('[data-testid="modal-close-icon"]').click();
  });
  it('Cencel btn', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('[data-testid="personal-info-cancel"]').click();
  });
});
