describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('1. Filter time should open when clicked on Хугацаа сонгох button', () => {
    cy.get('[data-testid="ComboBtn2"]').contains('Хугацаа сонгох').should('exist').click();
    cy.get('[data-testid="timesChoose"]').should('exist').should('be.visible');
  });

  it('2. should select frameworks when clicked', () => {
    cy.get('[data-testid="ComboBtn2"]').click();
    cy.get('[data-testid="input2"]').should('exist').type('Next.js');
    cy.get('[ data-testid="times"]').should('exist');
    cy.get('[data-testid="ComboBtn2"]').click();
  });
});
