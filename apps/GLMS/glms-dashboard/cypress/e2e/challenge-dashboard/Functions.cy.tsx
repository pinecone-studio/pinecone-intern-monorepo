export const addTextAnswers = (answers: string[]) => {
  cy.get('[data-testid="select-text-button"]').click();
  answers.forEach((answer, index) => {
    if (index > 0) {
      cy.contains('Хариулт нэмэх').click();
    }
    cy.get('[data-cy="answer-input"]').eq(index).type(answer);
  });
};
export const submitQuiz = () => {
  cy.get('input[name="question"]').type('Sample question');
  cy.get('[data-testid="select-text-button"]').click();
  addTextAnswers(['answer 1', 'answer 2', 'answer 3', 'answer 4']);
  cy.get('[data-testid="choose-button"]').click();
  cy.get('[data-cy="radio-input"]').eq(0).click();
  cy.get('[data-cy="submit-btn"]').click();
};
