describe('dashboard component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Should display Dashboard Lab page', () => {
    cy.get('[data-cy="Dashboard-Lab-Page"]').should('exist').should('be.visible');
  });

  it('Should display Ноорог section on Dashboard  page', () => {
    cy.get('[data-cy="Ноорог"]').should('exist').should('be.visible');
    cy.get('[data-cy="Ноорог"]').click();
  });

  it('Should display Архив section on Dashboard Lab page', () => {
    cy.get('[data-cy="Архив"]').should('exist').should('be.visible');
    cy.get('[data-cy="Архив"]').click();
  });

  it('navigates to /create-course when clicked', () => {
    cy.get('[data-cy="CreateCourseBtn"]').click();
    cy.url().should('include', '/create-course');
  });

  it('course clicked', () => {
    cy.get('[data-cy="courseClick"]').eq(0).click({ multiple: true });
    cy.url().should('include', '/6633305c94d4584898bb049a');
  });
});
