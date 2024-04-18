describe('it should renders with correct style', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const props = {
    date: 'String',
    title: 'String',
    description: 'String',
    cover: 'String',
    category: 'String',
  };
  cy.get('[data-testid="main-container"]').should('exist');
  cy.get('[data-testid="main-container"]').should('have.css', 'height', '404px');
  cy.get('[data-testid="main-container"]').children().should('have.length', 1);

  cy.get('[data-testid="article-date"]').should('exist').and('have.text', props.date.toString());
  cy.get('[data-testid="title"]').should('exist').and('have.text', props.date.toString());
  cy.get('[data-testid="description"]').should('exist').and('have.text', props.date.toString());
  cy.get('[data-testid="category"]').should('exist').and('have.text', props.date.toString());
  cy.get('[data-testid="article-cover"]').should('exist').and('have.text', props.date.toString());
});
