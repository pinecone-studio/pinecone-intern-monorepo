describe('Challenge result page', () => {
  const localStorageKey = 'studentChoices';
  const localStorageValue = JSON.stringify([
    {
      quizId: '664d99c9fb7b77a2937a2a0b',
      choiceId: '664d99c9fb7b77a2937a2a0d',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a0b',
      choiceId: '664d99c9fb7b77a2937a2a11',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a13',
      choiceId: '664d99c9fb7b77a2937a2a16',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a19',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a1e',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a21',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a24',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a27',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a2a',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a2d',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a2d',
    },
  ]);
  beforeEach(() => {
    cy.visit('/challenge/result/6653e62d905e01e9966b273f');
    cy.window().then((window) => {
      window.localStorage.setItem(localStorageKey, localStorageValue);
    });
  });

  it('1. Should display', () => {
    cy.get('[data-testid="challenge-result"]').should('exist');
  });
});
