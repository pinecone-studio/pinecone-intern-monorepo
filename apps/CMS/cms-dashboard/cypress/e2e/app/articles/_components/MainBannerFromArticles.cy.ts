describe('mainBannerComp', () => {
  beforeEach(() => {
    cy.visit('https://localhost:4200');
  });

  it('renders with correct props and structure', () => {
    const props = {
      date: 'string',
      categories: 'string',
      ArticlesTitle: 'string',
      cover: 'https://getwallpapers.com/wallpaper/full/2/6/e/1179758-cool-cat-hd-wallpapers-1080p-1920x1080.jpg',
    };
    cy.get('[data-testid="mainBannerComp"]').should('exist');
    cy.get('[data-testid="mainBannerComp"]').should('have.css', 'height', 656);
    cy.get('[data-testid="mainBannerComp"]').children().should('have.length', 1);

    // cy.get('[data-testid="articlesCover"]').should('exist').and('have.text', props.ArticlesCover.toString());
    cy.get('[data-testid="articlesTitle"]').should('exist').and('have.text', props.ArticlesTitle.toString());
    cy.get('[data-testid="date"]').should('exist').and('have.text', props.date.toString());
    cy.get('[data-testid="categories"]').should('exist').and('have.text', props.categories.toString());
    cy.get('[data-testid="cover"]').should('exist').and('have.text', props.categories.toString());
  });
  it('renders with correct style', () => {
    cy.get('[data-test="innerComp"]').should('exist').and('have.css', 'background-color', 'linear-gradient(0deg,rgba(0,0,0,1) 0%, rgba(0,0,2,1) 29%, rgba(0,0,0,1) 60%, rgba(255,255,255,0) 100%)');
  });

  it('should clicked and have style', () => {
    cy.get('[data-testid="mainBtn"]').should('exist').and('have.css', 'background-color', '#fff').click();
  });
});
