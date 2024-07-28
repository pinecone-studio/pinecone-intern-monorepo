describe('GetQuestionsFeature Component', () => {  
    beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === "CreateQuestion") {
            req.reply({
                data: { createQuestion: { id: "3", text: "Newly Added Question", quizId: "1", options: [] }}
            });
            req.alias = 'createQuestion';
        } else if (req.body.operationName === "GetQuestions") {
            req.reply({
                data: {
                    getQuestions: [
                        { id: '1', text: 'Question 1', options: [{ id: '1', optionText: 'Option 1', isCorrect: true }] },
                        { id: '2', text: 'Question 2', options: [{ id: '2', optionText: 'Option 2', isCorrect: true }] },
                        { id: '3', text: 'Newly Added Question', options: [] }
                    ],
                }
            });
            req.alias = 'getQuestions'; 
        }
    });
      cy.visit(`/admin/quiz/475e4247-4ac0-4115-a7f2-18c638ca47b9`);
    });
  
    const generateResponse = (state: string) => {
      switch (state) {
        case 'loading':
          return { data: null, loading: true, error: null };
        case 'error':
          return { data: {}, errors: [{ message: 'Алдаа гарлаа' }] };
        default:
          return {};
      }
    };
  
    const interceptGraphQL = (state: string) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetQuestions') {
          const response = generateResponse(state);
          req.reply(response);
        }
      }).as(state);
    };
  
    it('displays a loading indicator', () => {
      interceptGraphQL('loading');
      cy.reload();
      cy.wait('@loading');
      cy.get('[data-testid="loading"]').should('be.visible');
    });
  
    it('displays an error message on a failed fetch', () => {
      interceptGraphQL('error');
      cy.reload();
      cy.wait('@error');
      cy.get('[data-testid="error"]').should('contain', 'Алдаа гарлаа');
    });
  
    it('displays a message if no questions are available', () => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'GetQuestions') {
          req.reply({
            data: { getQuestions: [] },
          });
        }
      }).as('noQuestions');
      cy.reload();
      cy.wait('@noQuestions');
      cy.get('[data-testid="no-questions"]').should('be.visible');
    });
  
    it('successfully fetches and displays questions', () => {
      cy.wait('@getQuestions');
      cy.get('[data-testid="question-0"]').should('contain', 'Question 1');
      cy.get('[data-testid="question-1"]').should('contain', 'Question 2');
      cy.get('[data-testid="option-text-0"]').should('contain', 'Option 1').and('be.visible');
      cy.get('[data-testid="option-correctness-0"]').should('contain', 'Correct').and('be.visible');
      cy.get('[data-testid="option-correctness-0"]').should('contain', 'Correct').and('be.visible');
      cy.get('[data-testid="option-text-1"]').should('contain', 'Option 2').and('be.visible');
    });
  
    it('triggers refetch after successfully creating a question', () => {
      cy.get('[data-testid="open-dialog-button"]').click();
      cy.get('[data-testid="question-input"]').type('Sample Question');
      cy.get('[data-testid="option-input-0"]').type('Option 1');
      cy.get('[data-testid="option-input-1"]').type('Option 2');
      cy.get('[data-testid="option-input-2"]').type('Option 3');
      cy.get('[data-testid="option-input-3"]').type("Option 4");
      cy.get('[data-testid="correct-checkbox-0"]').click();
      cy.get('[data-testid="submit-button"]').click();

      cy.wait('@createQuestion').its('response.body.data').should('have.property', 'createQuestion');
      cy.wait('@getQuestions').its('response.body.data').should('have.property', 'getQuestions');

      cy.get('[data-testid="question-2"]').should('contain', 'Newly Added Question');
    });
});
  