// describe('createLessonPage', () => {
//   beforeEach(() => cy.visit('/create-lesson'));

//   it('1. Should display create lesson form', () => {
//     cy.get('[data-testid="create-lesson-container"]').should('exist').should('be.visible');
//   });
// it('2. check back to dashboard page button click ', () => {
//   cy.get('[data-testid="test-back-div"]').should('exist');
//   cy.get('[data-testid="test-back-div"]').click();
// });
// it('3. create lesson button', () => {
//   cy.get('[data-testid="create-button-of-lesson"]').should('exist').should('be.disabled');
// });
// it('4. check create button be enable and inputs', () => {
//   cy.get('#title-test-of-lesson').type('some text');
//   cy.get('#file-test').selectFile('public/js.png', { force: true });
//   cy.get('[data-testid="create-button-of-lesson"]').should('not.be.disabled');
//   cy.get('[data-testid="create-button-of-lesson"]').click();
// });
// });
