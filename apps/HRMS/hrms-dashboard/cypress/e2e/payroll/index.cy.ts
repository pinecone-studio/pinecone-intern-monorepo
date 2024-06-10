describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Header should display welcome page name', () => {
    cy.get('[data-testid="h1"]').contains('Цалингийн тооцоолол').should('exist');
  });

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
