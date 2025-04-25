describe('AdminHeader', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });
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
