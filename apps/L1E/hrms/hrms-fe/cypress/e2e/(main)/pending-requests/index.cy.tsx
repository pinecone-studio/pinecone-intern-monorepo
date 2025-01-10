describe('pending page', () => {
  it('Should render requestform page', () => {
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonApprove]').click();
    cy.get('[data-cy=approve-modal]').click();
  });
  it('Should render requestform page', () => {
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonApprove]').click();
    cy.get('[data-cy=reject-modal]').click();
  });
  it('Should render requestform page', () => {
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonReject]').click();
    cy.get('[data-cy=areaButton]').type('test');
    cy.get('[data-cy=refuse-modal-button]').click();
  });
  it('Should render requestform page', () => {
    cy.visit('/pending-requests');
    cy.get('[data-cy=pending-page]').should('be.visible');
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=status0]').click();
    cy.get('[data-cy=status-button]').click();
    cy.get('[data-cy=employee-0]').click();
    cy.get('[data-cy=buttonReject]').click();
    cy.get('[data-cy=refuse-modal-button-back]').click();
  });
});
