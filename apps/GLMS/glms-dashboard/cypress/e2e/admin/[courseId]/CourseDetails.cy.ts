describe('CourseDetail Tests', () => {
  const generateResponse = (state: string) => {
    switch (state) {
      case 'loading':
        return { data: null, loading: true, error: null };
      case 'error':
        return { data: null, errors: [{ message: 'Error fetching course details' }] };
      case 'empty':
        return { data: { getCourse: null } };
      default:
        return {
          data: {
            getCourse: {
              id: '1',
              title: 'Example Course',
              content: 'This is a detailed description of an example course.',
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

      if (req.body.operationName === 'GetCourse') {
        const response = generateResponse(state);
        req.reply(response);
      }
    }).as(state);
  };

  beforeEach(() => {
    interceptGraphQL('default');
    cy.visit('/admin/475e4247-4ac0-4115-a7f2-18c638ca47b9');
  });

  it('displays error message on failure', () => {
    interceptGraphQL('error');
    cy.reload();
    cy.wait('@error');
    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Error fetching course details');
  });

  it('displays the course details successfully', () => {
    cy.wait('@default');
    cy.get('[data-testid="course-details"]').should('be.visible');
    cy.get('[data-testid="course-title"]').should('contain', 'Example Course');
    cy.get('[data-testid="course-content"]').should('contain', 'This is a detailed description');
  });

  it('displays a message if no course details are available', () => {
    interceptGraphQL('empty');
    cy.reload();
    cy.wait('@empty');
    cy.get('[data-testid="course-details"]').should('not.exist');
  });
});
