/* eslint-disable no-secrets/no-secrets */
describe('Student page test', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetCourses') {
        req.reply({
          data: {
            getCourses: [
              { id: '1', title: 'Course One', content: 'Content for course one', thumbnail: 'https://res.cloudinary.com/dbtqkhmu5/image/upload/v1719917674/n6801dl7s9tyszvrdgli.png' },
              { id: '2', title: 'Course Two', content: 'Content for course two', thumbnail: 'https://res.cloudinary.com/dbtqkhmu5/image/upload/v1719917674/n6801dl7s9tyszvrdgli.png' },
            ],
          },
        });
      }
    }).as('getCourses');
    cy.visit('/student');
  });

  const generateResponse = (state: string) => {
    switch (state) {
      case 'loading':
        return { data: null, loading: true, error: null };
      case 'error':
        return { data: {}, errors: [{ message: 'Failed to fetch courses' }] };
      default:
        return {};
    }
  };

  const interceptGraphQL = (state: string) => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetCourses') {
        const response = generateResponse(state);
        req.reply(response);
      }
    }).as(state);
  };

  it('display loading state correctly', () => {
    interceptGraphQL('loading');
    cy.reload();
    cy.wait('@loading');
    cy.get('[data-testid="loading"]').should('contain', 'Loading...');
  });

  it('display an error message on failed fetch', () => {
    interceptGraphQL('error');
    cy.reload();
    cy.wait('@error');
    cy.get('[data-testid="error-message"]').should('contain', 'Failed to fetch courses');
  });

  it('successfully displays courses when data fetch succeeds', () => {
    cy.reload();
    cy.wait('@getCourses');
    cy.contains('Course One').should('be.visible');
    cy.contains('Course Two').should('be.visible');
  });
});
