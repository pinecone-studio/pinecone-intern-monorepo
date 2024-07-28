describe('Quiz Component', () => {
    beforeEach(() => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'GetQuiz') {
          req.reply({
            data: {
              getQuiz: {
                courseId: 'course-1',
              },
            },
          });
        }
      }).as('getQuiz');
      cy.visit('/admin/475e4247-4ac0-4115-a7f2-18c638ca47b9');
    });
  
    const generateResponse = (state: string) => {
      switch (state) {
        case 'loading':
          return { data: null, loading: true, error: null };
        case 'error':
          return { data: {}, errors: [{ message: 'Failed to fetch quiz' }] };
        default:
          return {};
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
  
    it('should displays an error message on a failed fetch', () => {
      interceptGraphQL('error');
      cy.reload();
      cy.wait('@error');
      cy.get('[data-testid="error-message"]').should('contain', 'Failed to fetch quiz');
    });
  
    it('should displays a loading message while fetching', () => {
      interceptGraphQL('loading');
      cy.reload();
      cy.get('[data-testid="loading"]').should('contain', 'Quiz loading...');
    });
  
    it('should successfully fetches and displays quiz', () => {
      cy.wait('@getQuiz');
      cy.get('a[href="/admin/quiz/course-1"]').should('be.visible');
    });
});

