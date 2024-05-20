import { addTextAnswers, submitQuiz } from './Functions.cy';
describe('Page Component add quizs', () => {
  beforeEach(() => {
    cy.visit('/challenge-dashboard');
  });
  it('1. should go to dashboard page', () => {
    cy.get('[data-cy="dashboard-router"]').click();
  });
  it('2. should type in question input', () => {
    cy.get('input[name="question"]').type('Sample question');
  });
  it('3. should display validation error if question is empty and click add button', () => {
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('span.text-red-400').should('contain', 'Асуулт оруулна уу');
  });
  it('4. should add question and two image answers and if cancel button is clicked image will not be display', () => {
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('[data-testid="cancel-btn"]').eq(0).click();
    cy.get('[data-testid="cancel-btn"]').eq(1).click();
  });
  it('5. should add question and two image and click true or false', () => {
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('[data-testid="choose-button"]').click();
    cy.get('input[type="checkbox"]').eq(1).click();
  });

  it('7. should submit text answer data', () => {
    cy.get('input[name="question"]').type('Sample question');
    cy.get('[data-testid="select-text-button"]').click();
    addTextAnswers(['answer 1', 'answer 2', 'answer 3', 'answer 4']);
    cy.contains('Зөв хариулт сонгох').click();
    cy.get('[data-cy="radio-input"]').eq(0).click();
    cy.get('[data-cy="submit-btn"]').click();
  });
  it('8. should submit image answer data', () => {
    cy.get('input[name="question"]').type('Sample question');
    cy.get('[data-testid="select-file-button"]').click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/html.png', { force: true });
    cy.get('[data-testid="choose-button"]').click();
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.get('input[type="checkbox"]').eq(0).click();
    cy.get('[data-cy="submit-btn"]').click();
  });
  it('9. should load the UpdateQuiz in UpdateQuiz component', () => {
    submitQuiz();
    cy.get('[data-testid="update-quiz"]').should('exist');
  });
  it('10. should display validation error if question is empty and click add button', () => {
    submitQuiz();
    cy.get('input[name="question"]').clear();
    cy.get('[data-cy="update-btn"]').click();
    cy.get('span.text-red-400').should('contain', 'Асуулт оруулна уу');
  });
  it('11. should update the question input field', () => {
    submitQuiz();
    const newQuestion = 'New Quiz Question';
    cy.get('input[name="question"]').clear();
    cy.get('input[name="question"]').eq(0).type(newQuestion);
    cy.get('input[name="question"]').should('have.value', newQuestion);
  });
  it('12. should switch file or image answer button', () => {
    submitQuiz();
    cy.get('[data-testid="select-file-button"]').eq(0).click();
    cy.get('[data-testid="select-text-button"]').eq(0).click();
  });
  it('13. should possible to add choice if choice is no more than 4 ', () => {
    cy.get('input[name="question"]').type('Sample question');
    cy.get('[data-testid="select-text-button"]').click();
    addTextAnswers(['answer 1', 'answer 2', 'answer 3']);
    cy.get('[data-testid="choose-button"]').click();
    cy.get('[data-cy="radio-input"]').eq(0).click();
    cy.get('[data-cy="submit-btn"]').click();
    cy.contains('Хариулт нэмэх').click();
  });
  it('14. should handle text answers correctly', () => {
    submitQuiz();
    cy.get('[data-cy="answer-input"]').eq(0).clear();
    cy.get('[data-cy="answer-input"]').eq(0).type('Answer 1 updated');
    cy.contains('Зөв хариулт сонгох').click();
    cy.get('[data-cy="radio-input"]').eq(0).click();
    cy.get('[data-cy="answer-input"]').should('have.value', 'Answer 1 updated');
    cy.contains('button', 'save').click();
  });
  it('15. should handle image answers correctly', () => {
    submitQuiz();
    cy.get('[data-testid="select-file-button"]').eq(0).click();
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('#file-test').selectFile('public/pic.png', { force: true });
    cy.get('[data-testid="choose-button"]').click();
    cy.get('input[type="checkbox"]').eq(0).click();
    cy.get('input[type="checkbox"]').eq(1).click();
  });
  it('16. should delete the quiz', () => {
    submitQuiz();
    cy.get('[data-cy="delete-btn"]').click();
    cy.get('[data-testid="update-quiz"]').should('not.exist');
  });
  it('17. should update quiz ', () => {
    submitQuiz();
    cy.get('[data-cy="update-btn"]').click();
  });

  it('18. should display success toast on successful challenge creation', () => {
    submitQuiz();
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'CreateChallenge') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              createChallenge: {
                success: true,
              },
            },
          },
        });
      }
    }).as('createChallengeMutation');
    cy.contains('button', 'Нийтлэх').click();
    cy.wait('@createChallengeMutation');
    cy.contains('Сорилийг амжилттай үүсгэлээ').should('exist');
  });

  it('19. should display error toast on unsuccessful challenge creation', () => {
    submitQuiz();
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateChallenge') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [
              {
                message: 'Error creating challenge',
              },
            ],
          },
        });
      }
    }).as('createChallengeMutation');
    cy.contains('button', 'Нийтлэх').click();
    cy.wait('@createChallengeMutation');
    cy.contains('Error creating challenge').should('exist');
  });
});
