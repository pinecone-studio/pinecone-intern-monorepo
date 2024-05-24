// describe('createLessonPage', () => {
//   beforeEach(() => cy.visit('/create-lesson'));

//   it('1. Should display create lesson form', () => {
//     cy.get('[data-testid="create-lesson-container"]').should('exist').should('be.visible');
//   });
//   it('2. check back to dashboard page button click ', () => {
//     cy.get('[data-testid="test-back-div"]').should('exist').click();
//     cy.url().should('include', '/dashboard');
//   });
//   it('3. create lesson button', () => {
//     cy.get('[data-testid="create-button-of-lesson"]').should('exist').should('be.disabled');
//   });

//   it('creates a lesson and navigates to the correct route', () => {
//     cy.intercept('POST', '**/graphql', (req) => {
//       if (req.body.operationName === 'CreateLesson') {
//         req.reply((res) => {
//           res.send({ data: { createLesson: { id: 'lessonId' } } });
//         });
//       }
//     }).as('createLesson');

//     cy.get('#title-test-of-lesson').type('some text');
//     cy.get('#file-test').selectFile('public/js.png', { force: true });
//     cy.get('[data-testid="create-button-of-lesson"]').should('not.be.disabled');
//     cy.get('[data-testid="create-button-of-lesson"]').click();
//     cy.wait('@createLesson');
//     cy.url().should('include', '/dashboard' || `/6633305c94d4584898bb049a`);
//   });
// });


describe('LessonAdd Component', () => {
  beforeEach(() => {
    cy.visit('/create-lesson'); 
  });

  it('should render the LessonAdd form', () => {
    cy.get('[data-testid="create-lesson-container"]').should('be.visible');
  });

  it('should navigate back to the dashboard when the back div is clicked', () => {
    cy.get('[data-testid="test-back-div"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should fill out the form and submit', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('courseID', '6633305c94d4584898bb049a');
    });
    cy.get('input[name="title"]').type('Test Lesson Title');
    cy.get('#file-test').selectFile('public/js.png', { force: true }); 
    cy.get('[data-testid="create-button-of-lesson"]').click();
    cy.url().should('include', '/6633305c94d4584898bb049a');
  });

  it('should disable submit button if form is not valid', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('courseID', '6633305c94d4584898bb049a');
    });
    cy.get('[data-testid="create-button-of-lesson"]').should('be.disabled');
    cy.get('input[name="title"]').type('Test Lesson Title');
    cy.get('[data-testid="create-button-of-lesson"]').should('be.disabled');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-testid="create-button-of-lesson"]').should('not.be.disabled');
    cy.get('[data-testid="create-button-of-lesson"]').click();
    cy.url().should('include', '/6633305c94d4584898bb049a');

  });
});
