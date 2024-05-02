describe('AddChallengeModal Component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('should open the modal when the "Сорил" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
  });

  it('should close the modal when close button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
    cy.get('[data-testid="close-button"]').click();
    cy.contains('Сорил нэмэх').should('not.be.visible');
  });

  it('should select a topic and a course in the modal', () => {
    const selectedTopic = 'HTML syntax';
    const selectedCourse = 'HTML tags';

    cy.get('[data-testid="challenge-button"]').click();

    cy.contains('Сэдэв сонгох').next('select').select(selectedTopic);
    cy.contains('Сэдэв сонгох').next('select').should('have.value', selectedTopic);

    cy.contains('Хичээл сонгох').next('select').select(selectedCourse);
    cy.contains('Хичээл сонгох').next('select').should('have.value', selectedCourse);
  });

  it('should close the modal when "Оруулах" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('[data-testid="challenge-dialog"]').should('be.visible');
    cy.get('[data-testid="next-page-btn"]').click();
    cy.get('[data-testid="challenge-dialog"]').should('not.be.visible');
  });
  it('should jump to "challenge-dashboard" page when "Оруулах" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('[data-testid="next-page-btn"]').click();
    cy.url().should('include', '/challenge-dashboard');
  });
});
