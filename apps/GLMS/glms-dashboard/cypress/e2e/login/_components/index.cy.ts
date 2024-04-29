describe('CuspomInput components', () => {
  beforeEach(() => cy.visit('/CuspomInpute'));

  it('Should display welcome message', () => {
    cy.get('[data-testid="input"]').should('exist');
  });
  it('2', () => {
    cy.get('#custom-input').type('');
  });
});
