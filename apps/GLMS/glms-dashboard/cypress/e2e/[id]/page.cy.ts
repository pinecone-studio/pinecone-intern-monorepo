describe(' course Id page should visit [id]', () => {
  beforeEach(() => {
    cy.visit(`/6633305c94d4584898bb049a`);
  });
  it('should display courseid page', () => {
    cy.visit(`/6633305c94d4584898bb049a`);
    cy.get('[data-cy="idCourse"]').should('exist');
    cy.contains('Loading...').should('not.exist');
    cy.contains('Error:').should('not.exist');
  });

  it('1. Should create lesson', () => {
    cy.visit(`/6633305c94d4584898bb049a`);
    cy.get('[data-testid="add-lesson-button-test-id"]').should('exist').click();
    cy.url().should('include', '/create-lesson');
  });
  it('2. Should navigate back to dashboard ', () => {
    cy.visit(`/6633305c94d4584898bb049a`);
    cy.get('[data-cy="prev-button-test-id"]').should('exist').click();
    cy.url().should('include', '/6633305c94d4584898bb049a');
  });

  it('3. Should set lessonID in localStorage and navigate to /section', () => {
    cy.get('[data-cy="lesson-test-id"]').eq(0).should('exist').click();
    cy.window().its('localStorage').invoke('getItem', 'lessonID');
    cy.url().should('include', '/section');
  });
  it('4. Should navigate to update-course when id is present', () => {
    cy.visit(`/6633305c94d4584898bb049a`);
    cy.get('[data-testid="edit-course-button"]').should('exist').click();
    cy.url().should('include', '/update-course');
  });
  it('5. Should navigate to update-lesson', () => {
    cy.visit(`/6633305c94d4584898bb049a`);
    cy.get('[data-cy="lesson-edit-button-test-id"]').eq(0).should('exist').click();
    cy.url().should('include', '/update-lesson');
  });
});
