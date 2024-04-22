describe('ArticleCard', () => {
  const props = {
    date: '2024.04.16',
    title: 'Morphosis',
    description: 'it is just a description',
    cover: '',
    category: '#Coding',
  };
  beforeEach(() => {
    cy.visit('/');
  });
  it('should render with correct props',()=>{
    cy.get('[data-testid="main-container"]').should('exist');
    cy.get('[data-testid="main-container"]').should('have.css', 'height', '404px');
    cy.get('[data-testid="main-container"]').children().should('have.length', 24);
  
    cy.get('[data-testid="article-date"]').first().should('exist').and('have.text', props.date.toString());
    cy.get('[data-testid="article-title"]').first().should('exist').and('have.text', props.title.toString());
    cy.get('[data-testid="description"]').first().should('exist').and('have.text', props.description.toString());
    cy.get('[data-testid="category"]').first().should('exist').and('have.text', props.category.toString());
    cy.get('[data-testid="article-cover"]').first().should('exist').and('have.text', props.cover.toString());
  })
 
});
