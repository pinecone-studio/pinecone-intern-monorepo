describe('Handle update-course page', () => {
  beforeEach(() => cy.visit('/update-course'));

  it('1. Update course page', () => {
    cy.get('[data-testid="update-course-container"]').should('exist');
  });

  it('2. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
  });

  it('3.Should display update course container', () => {
    cy.get('[data-testid="update-course-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist').type('html');
    cy.get('[data-cy="description"]').should('exist').type('html intro');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="update-button"]').click();
  });
  it('4. updates form fields with data from API', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetCourseByIdQuery') {
        req.reply((res) => {
          res.send({
            data: {
              getSectionById: {
                id: 'course-id',
                title: 'Mock Title',
                description: 'Mock Description',
                contentImage: 'mock-image.jpg',
              },
            },
          });
        });
      }
    }).as('GetCourseByIdQuery');
  });
  it('should set courseID from localStorage on mount', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('courseID', 'course-id-123');
    });
    cy.reload();
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetCourseById') {
        req.reply({
          data: {
            getCourseById: {
              id: 'course-id-123',
              title: 'Test Course Title',
              description: 'Test Course Description',
              thumbnail: 'test-thumbnail.png',
            },
          },
        });
      }
    }).as('graphql');
    cy.wait('@graphql').its('request.body.variables.getCourseByIdId').should('eq', 'course-id-123');
  });
});
