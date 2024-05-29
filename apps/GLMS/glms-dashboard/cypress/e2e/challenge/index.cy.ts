describe('Challenge page', () => {
  beforeEach(() => cy.visit('/challenge'));

  it('1. Should display welcome message', () => {
    cy.get('h1').contains('Welcome to Challenge page');
  });
});

describe('Challenge quiz page', () => {
  beforeEach(() => cy.visit('/challenge/664d99c9fb7b77a2937a2a30'));
  it('1. Should display ProgressBar', () => {
    cy.get('[data-testid="progress-bar"]').should('exist');
  });
  it('2. Should display next-button', () => {
    cy.get('[data-testid="next-button"]').should('exist');
    cy.get('[data-testid="next-button"]').should('be.disabled');
  });
});

describe('Challenge result page', () => {
  beforeEach(() => cy.visit('/challenge/result/664d99c9fb7b77a2937a2a30'));

  it('1. Should display "Quiz harah"', () => {
    cy.get('h1').contains('Quiz алдаа харах');
  });
});
