describe('CheckPoint-Page', () => {
  beforeEach(() => {
    cy.visit('/recovery/checkpoint');
  });

  it('should render CheckPoint component', () => {
    cy.get('[data-cy=CheckPoint-Page]').should('be.visible');
  });

  it('should show the CheckCircle icon', () => {
    cy.get('svg[data-testid=CheckCircle').should('be.visible');
  });
});
