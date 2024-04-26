describe('AddChallengeModal Component', () => {
  beforeEach(() => {
    cy.visit('/challenge-dashboard');
  });

  it('should open the modal when the "Сорил" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('DialogTitle').should('contain.text', 'Сорил нэмэх');
  });

  it('should close the modal when the close button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('IconButton[aria-label="close"]').click();
    cy.get('DialogTitle').should('not.exist');
  });

  it('should select a topic and a course in the modal', () => {
    const selectedTopic = 'HTML intro';
    const selectedCourse = 'HTML tags';

    cy.get('[data-testid="challenge-button"]').click();

    cy.get('SelectButton').eq(0).select(selectedTopic);
    cy.get('SelectButton').eq(0).should('have.value', selectedTopic);

    cy.get('SelectButton').eq(1).select(selectedCourse);
    cy.get('SelectButton').eq(1).should('have.value', selectedCourse);
  });

  it('should close the modal when "Оруулах" button is clicked', () => {
    cy.get('[data-testid="challenge-button"]').click();
    cy.get('Button').contains('Оруулах').click();
    cy.get('DialogTitle').should('not.exist');
  });
});
