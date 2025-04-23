describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4201');
  });
  it('Should render My request button', () => {
    cy.contains('My request').should('exist');
    cy.get('[data-cy="My-request"]').should('be.visible');
    cy.get('[data-cy="My-request"]').should('contain.text', 'My request');
  });

  it('Should render Request Form button', () => {
    cy.contains('Request Form').should('exist');
    cy.get('[data-cy="Request-Form"]').should('be.visible');
    cy.get('[data-cy="Request-Form"]').should('contain.text', 'Request Form');
  });

  it('Should render Leave Calendar button', () => {
    cy.contains('Leave Calendar').should('exist');
    cy.get('[data-cy="Leave-Calendar"]').should('be.visible');
    cy.get('[data-cy="Leave-Calendar"]').should('contain.text', 'Leave Calendar');
  });
});
