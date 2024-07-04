describe('LessonDetails', () => {
  const generateResponse = (state: string) => {
    switch (state) {
      case 'loading':
        return { data: null, loading: true, error: null };
      case 'error':
        return { data: null, errors: [{ message: 'Error fetching lesson details' }] };
      case 'empty':
        return { data: { getLessonDetails: null } };
      default:
        return {
          data: {
            getLessonDetails: {
              id: '1',
              title: 'Example lesson details',
              content: 'This is a detailed description of an example course',
              // eslint-disable-next-line no-secrets/no-secrets
              thumbnail: 'http://res.cloudinary.com/dbtqkhmu5/image/upload/v1719917674/n6801dl7s9tyszvrdgli.png',
            },
          },
        };
    }
  };

  const interceptGraphQL = (state: string) => {
    cy.intercept('POST', '**/graphql', (req) => {
      console.log('Intercepting request:', req.body);

      if (req.body.operationName === 'GetLessonDetails') {
        const response = generateResponse(state);
        req.reply(response);
      }
    }).as(state);
  };

  beforeEach(() => {
    interceptGraphQL('default');
    cy.visit('/student/475e4247-4ac0-4115-a7f2-18c638ca47b9/45ea42d4-139c-4cff-9c8d-7b0b828d57dd');
  });

  it('displays error message on failure', () => {
    interceptGraphQL('error');
    cy.reload();
    cy.wait('@error');
    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Error fetching lesson details');
  });

  it('displays the lesson details successfully', () => {
    cy.wait('@default');
    cy.get('[data-testid="lesson-details"]').should('be.visible');
    cy.get('[data-testid="lesson-title"]').should('contain', 'Example lesson details');
    cy.get('[data-testid="lesson-content"]').should('contain', 'This is a detailed description of an example course');
  });

  it('displays a message if no lesson details are available', () => {
    interceptGraphQL('empty');
    cy.reload();
    cy.wait('@empty');
    cy.get('[data-testid="lesson-details"]').should('not.exist');
  });
});