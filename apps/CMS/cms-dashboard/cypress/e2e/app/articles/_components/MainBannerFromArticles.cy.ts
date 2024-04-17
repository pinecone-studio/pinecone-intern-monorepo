describe('mainBannerComp', () => {
  const props = {
    date: '2024.04.16',
    categories: '#Coding',
    articlesTitle: 'Marphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд',
    cover: encodeURI('/ganu.jpeg'),
  };
  beforeEach(() => cy.visit('/'));
  it('renders with correct props and structure', () => {
    cy.get('[data-testid="mainBannerComp"]').should('exist');
    cy.get('[data-testid="mainBannerComp"]').should('have.css', 'height', '656px');
    cy.get('[data-testid="mainBannerComp"]').children().should('have.length', 2);

    cy.get('[data-testid="articlesTitle"]').should('exist').and('have.text', props.articlesTitle.toString());
    cy.get('[data-testid="date"]').should('exist').and('have.text', props.date.toString());
    cy.get('[data-testid="categories"]').should('exist').and('have.text', props.categories.toString());
    cy.get('[data-testid="cover"]').should('have.attr', 'alt', 'article-cover');
  });
  it('renders with correct style', () => {
    cy.get('[data-testid="innerComp"]');
  });

  it('should clicked and have style', () => {
    cy.get('[data-testid="mainBtn"]').click();
  });
});
