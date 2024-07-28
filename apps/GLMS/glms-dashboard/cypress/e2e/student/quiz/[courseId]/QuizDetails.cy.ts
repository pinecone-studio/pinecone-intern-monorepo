describe('QuizDetails Component', () => {
    const generateResponse = (state: string) => {
      switch (state) {
        case 'loading':
          return { data: null, loading: true, error: null };
        case 'error':
          return { data: {}, errors: [{ message: 'Failed to fetch quiz details' }] };
        default:
          return {
            data: {
              getQuiz: { id: '1' }
            }
          };
      }
    };
  
    const interceptGraphQL = (state: string) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetQuiz') {
          const response = generateResponse(state);
          req.reply(response);
        }
      }).as(state);
    };
  
    beforeEach(() => {
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
      cy.get('[data-testid="error-message"]').should('contain', 'Failed to fetch quiz details');
    });
  
    it('displays quiz details successfully', () => {
      interceptGraphQL('default');
      cy.reload();
      cy.wait('@default');
      cy.get('[data-testid="loading"]').should('not.exist');
      cy.get('[data-testid="error-message"]').should('not.exist');
    });
  });
  