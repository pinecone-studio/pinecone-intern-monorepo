describe('UseProfile Component - User Sign-in Test', () => {
  it('should display UserProfile when the user is signed in', () => {
    cy.window().then((window) => {
      window.localStorage.setItem(
        'clerkSession',
        JSON.stringify({
          user: { id: '12345', firstName: 'John', lastName: 'Doe' },
          isSignedIn: true,
        })
      );
    });
    cy.visit('/profile');
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('exist');
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('have.text', 'Хэрэглэгчийн хэсэг');
    cy.get('.flex.justify-center').should('be.visible');
    cy.get('.flex.justify-center').should('contain.text', 'John Doe');
  });

  it('should not display UserProfile when the user is not signed in', () => {
    cy.window().then((window) => {
      window.localStorage.removeItem('clerkSession');
    });
    cy.visit('/profile');
    cy.get('.flex.justify-center').should('not.exist');
  });
});
