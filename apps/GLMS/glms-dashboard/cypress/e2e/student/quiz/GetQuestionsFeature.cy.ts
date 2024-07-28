describe('GetQuestionsFeature Component', () => {
    const generateResponse = (state: string) => {
      switch (state) {
        case 'loading':
          return { data: null, loading: true, error: null };
        case 'error':
          return { data: {}, errors: [{ message: 'Алдаа гарлаа' }] };
        default:
          return {
            data: {
              getQuestions: [
                { 
                    id: '1', 
                    text: 'Question 1', 
                    options: [
                        { id: '1', optionText: 'Option 1', isCorrect: true }, 
                        { id: '2', optionText: 'Option 2', isCorrect: false }
                    ]},
                { 
                    id: '2', 
                    text: 'Question 2', 
                    options: [
                        { id: '3', optionText: 'Option 3', isCorrect: true }, 
                        { id: '4', optionText: 'Option 4', isCorrect: false }
                    ]}
              ]
            }
          };
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
  
    beforeEach(() => {
      interceptGraphQL('default');
      cy.visit(`/student/quiz/475e4247-4ac0-4115-a7f2-18c638ca47b9`);
    });
  
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
      interceptGraphQL('noQuestions');
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetQuestions') {
          req.reply({ data: { getQuestions: [] } });
        }
      }).as('noQuestions');
      cy.reload();
      cy.wait('@noQuestions');
      cy.get('[data-testid="no-questions"]').should('be.visible');
      cy.get('button').contains('Check Quiz').should('not.exist');
    });
  
    it('does not display Check Quiz button if no questions are present', () => {
      interceptGraphQL('emptyQuestions');
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetQuestions') {
          req.reply({ data: { getQuestions: null } });
        }
      }).as('noQuestionsData');
      cy.reload();
      cy.wait('@noQuestionsData');
      cy.get('[data-testid="no-questions"]').should('be.visible');
      cy.get('button').contains('Check Quiz').should('not.exist');
    });
  
    it('successfully fetches and displays questions', () => {
      cy.wait('@default');
      cy.get('[data-testid="question-0"]').should('contain', 'Question 1');
      cy.get('[data-testid="question-1"]').should('contain', 'Question 2');
      cy.get('label[for="option-1"]').should('contain', 'Option 1');
      cy.get('label[for="option-2"]').should('contain', 'Option 2');
      cy.get('label[for="option-3"]').should('contain', 'Option 3');
      cy.get('label[for="option-4"]').should('contain', 'Option 4');
    });
  
    it('checks the answers and highlights the results correctly', () => {
      cy.wait('@default');
      cy.get('[data-testid="option-2"]').click();
      cy.get('[data-testid="option-3"]').click();
      cy.get('button').contains('Check Quiz').click();
      cy.get('[data-testid="question-0"]').should('have.class', 'border-red-500');
      cy.get('[data-testid="question-1"]').should('have.class', 'border-green-500');
    });
  
    it('displays correct answers and highlights after checkQuiz', () => {
      cy.wait('@default');
      cy.get('[data-testid="option-1"]').click();
      cy.get('[data-testid="option-3"]').click();
      cy.get('button').contains('Check Quiz').click();
      cy.get('[data-testid="question-0"]').should('have.class', 'border-green-500');
      cy.get('[data-testid="question-1"]').should('have.class', 'border-green-500');
    });
  
    it('displays incorrect answers and highlights after checkQuiz', () => {
      cy.wait('@default');
      cy.get('[data-testid="option-2"]').click();
      cy.get('[data-testid="option-4"]').click();
      cy.get('button').contains('Check Quiz').click();
      cy.get('[data-testid="question-0"]').should('have.class', 'border-red-500');
      cy.get('[data-testid="question-1"]').should('have.class', 'border-red-500');
    });
  });
  
  
  