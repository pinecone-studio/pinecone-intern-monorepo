describe('LessonAdd Component', () => {
  beforeEach(() => {
    cy.visit('/create-lesson'); 
  })
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
  })

});