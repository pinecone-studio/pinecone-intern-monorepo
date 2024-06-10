describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('[data-testid="h1"]').contains('Цалингийн тооцоолол').should('exist');
  });
  
});
