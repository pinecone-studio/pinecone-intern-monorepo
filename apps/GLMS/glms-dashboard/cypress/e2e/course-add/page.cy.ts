describe('CourseAdd component', () => {
  beforeEach(() => {
    cy.visit('/course-add');
  });

  it('should allow user to fill in course details and submit form', () => {
    cy.get('input[placeholder="Оруулна уу..."]').eq(0).type('Course Title');
    cy.get('input[placeholder="Энд бичнэ үү..."]').eq(0).type('Thumbnail URL');
    cy.get('input[placeholder="Энд бичнэ үү..."]').eq(1).type('Content Title');
    cy.get('input[placeholder="Энд бичнэ үү..."]').eq(2).type('Content Description');

    cy.get('button').contains('Үргэлжлүүлэх').click();
  });
});
