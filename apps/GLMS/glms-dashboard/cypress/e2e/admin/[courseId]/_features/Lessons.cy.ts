describe('Lessons Component', () => {
    beforeEach(() => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'GetLessons') {
          req.reply({
            data: {
              getLessons: [
                { id: '1', title: 'Introduction to Testing' },
                { id: '2', title: 'Advanced Testing Techniques' },
              ],
            },
          });
        }
      }).as('getLessons');
      cy.visit('/admin/475e4247-4ac0-4115-a7f2-18c638ca47b9');
    });
  
    const generateResponse = (state: string) => {
      switch (state) {
        case 'loading':
          return { data: null, loading: true, error: null };
        case 'error':
          return { data: {}, errors: [{ message: 'Failed to fetch lessons' }] };
        default:
          return {};
      }
    };
  
    const interceptGraphQL = (state: string) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetLessons') {
          const response = generateResponse(state);
          req.reply(response);
        }
      }).as(state);
    };
  
    it('displays an error message on a failed fetch', () => {
      interceptGraphQL('error');
      cy.reload();
      cy.wait('@error');
      cy.get('[data-testid="error-message"]').should('contain', 'Failed to fetch lessons');
    });
  
    it('displays a message if no lessons are available', () => {
      cy.intercept('POST', '/graphql', {
        statusCode: 200,
        body: { data: { getLessons: [] } },
      }).as('noLessons');
      cy.reload();
      cy.wait('@noLessons');
      cy.get('[data-testid="no-lessons"]').should('be.visible');
    });
  
    it('successfully fetches and displays lessons', () => {
      cy.wait('@getLessons');
      cy.get('[data-testid="lessons-list"]').should('be.visible');
      cy.get('[data-testid="lesson-1"]').should('contain', 'Introduction to Testing');
      cy.get('[data-testid="lesson-2"]').should('contain', 'Advanced Testing Techniques');
    });
  
    it('displays a message if no lessons are available', () => {
      cy.intercept('POST', '/graphql', {
        statusCode: 200,
        body: { data: { getLessons: [] } },
      });
      cy.reload();
      cy.get('[data-testid="no-lessons"]').should('be.visible');
    });
  });