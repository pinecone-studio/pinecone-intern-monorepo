describe('AddChallengeModal Component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('1. should open the modal when the "Сорил" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').eq(0).click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
  });

  it('2. should close the modal when close button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').eq(0).click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
    cy.get('[data-testid="close-button"]').eq(0).click();
    cy.contains('Сорил нэмэх').should('not.be.visible');
  });

  it('3. should select a topic in the modal', () => {
    const selectedTopic = 'Javascript';
    const selectedTopicId = '66604abf733e2bb9b1376372';

    cy.get('[data-testid="challenge-button"]').eq(0).click();
    cy.get("[data-cy='select']").select(selectedTopic);
    cy.get("[data-cy='select']").should('have.value', selectedTopicId);
  });

  it('4. should close the modal when "Оруулах" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').eq(0).click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
    cy.get('[data-testid="next-page-btn"]').eq(0).click();
  });
  it('5. should jump to "challenge-dashboard" page when "Оруулах" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').eq(0).click();
    cy.get('[data-testid="next-page-btn"]').eq(0).click();
    cy.url().should('include', '/challenge-dashboard');
  });
});
