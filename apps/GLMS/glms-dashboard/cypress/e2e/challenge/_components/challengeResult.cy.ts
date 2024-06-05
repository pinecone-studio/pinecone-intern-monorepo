describe('Challenge result page', () => {
  const localStorageKey = '6653e62d905e01e9966b273f';
  const localStorageValue = JSON.stringify([
    {
      quizId: '664d99c9fb7b77a2937a2a0b',
      choiceId: '664d99c9fb7b77a2937a2a0c',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a0b',
      choiceId: '664d99c9fb7b77a2937a2a12',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a13',
      choiceId: '664d99c9fb7b77a2937a2a14',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a1a',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a1f',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a22',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a25',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a28',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a2b',
    },
    {
      quizId: '664d99c9fb7b77a2937a2a18',
      choiceId: '664d99c9fb7b77a2937a2a2e',
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
