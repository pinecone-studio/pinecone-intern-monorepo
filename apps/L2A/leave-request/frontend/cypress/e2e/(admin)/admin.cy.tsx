describe('Admin page tests', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should open and close the modal when the register button and close button are clicked', () => {
    cy.get('[data-cy="open-register-modal"]').click();
    cy.get('[data-cy="register-employee-modal"]').should('be.visible')
    cy.get('[data-cy="close-register-modal"]').click();
    cy.get('[data-cy="register-employee-modal"]').should('not.exist');
    
  it('renders logo, toggle button, and avatar', () => {
    cy.get('img[src="PineconeStudio.png"]').should('be.visible');
    cy.get('button').should('exist');
    cy.get('img[src="https://github.com/shadcn.png"]').should('exist');
  });

  it('toggles dark mode on button click', () => {
    cy.get('html').should('not.have.class', 'dark');
    cy.get('button').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('button').click();
    cy.get('html').should('not.have.class', 'dark');
  });
});
