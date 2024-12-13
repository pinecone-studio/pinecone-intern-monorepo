describe('Admin Dashboard Tests', () => {
  it('1. Should render signIn', () => {
    cy.visit('/signin');
    cy.get('[data-cy=SignIn-Page]').should('be.visible');
    cy.get('[data-cy=SignIn-Email-Input]').type('by.dulguun@gmail.com');
    cy.get('[data-cy=SignIn-Password-Input]').type('1234');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
    cy.get('div').should('have.class', 'container');
    cy.get('[data-testid="Admin-Dash"]').should('exist');
    cy.get('[data-testid="Admin-Dash"]').find('h3').should('contain.text', 'Тасалбар');
    cy.get('[data-testid="Admin-Dash"]').find('p').should('contain.text', 'Идэвхитэй зарагдаж буй тасалбарууд');
  });
});
