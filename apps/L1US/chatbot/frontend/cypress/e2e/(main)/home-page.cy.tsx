describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('1) displays public home content when not logged in', () => {
    cy.contains('h1', 'HomePage').should('be.visible');
    cy.contains('Please log in or sign up').should('exist');
    cy.contains('button', 'Sign In').should('exist');
    cy.contains('button', 'Sign Up').should('exist');
    cy.contains('button', 'Chat Session').should('exist');
  });

  it('2) navigates to sign-in page', () => {
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/sign-in');
  });
  it('3) navigates to sign-up page', () => {
    cy.contains('button', 'Sign Up').click();
    cy.url().should('include', '/sign-up');
  });
  it('4) navigates to chat page', () => {
    cy.contains('button', 'Chat Session').click();
    cy.url().should('include', '/chat');
  });
});
