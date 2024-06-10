describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('1. Filter name should open when clicked on name button', () => {
    cy.get('[data-testid="ComboBtn"]').contains('Нэр сонгох').should('exist').click();
    cy.get('[data-testid="chooseName"]').should('exist').should('be.visible');
  });

  it('2. should select frameworks when clicked', () => {
    cy.get('[data-testid="ComboBtn"]').click();
    cy.get('[data-testid="input"]').should('exist').type('Astro');
    cy.get('[ data-testid="names"]').should('exist');
    cy.get('[data-testid="ComboBtn"]').click();
  });
});
