describe('DashBoardArticleDetail component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('renders with correct props and structure', () => {
    const props = {
      rate: 10,
      comment: 5,
      share: 3,
    };

    cy.get('[data-testid="dashboard-article-detail"]').should('exist');
    cy.get('[data-testid="dashboard-article-detail"]').should('have.css', 'background-color', 'rgb(247, 247, 248)');
    cy.get('[data-testid="dashboard-article-detail"]').should('have.css', 'height', '44px');

    cy.get('[data-testid="dashboard-article-detail"]').children().should('have.length', 1);

    cy.get('[data-testid="rate"]').should('exist').and('have.text', props.rate.toString());
    cy.get('[data-testid="comment"]').should('exist').and('have.text', props.comment.toString());
    cy.get('[data-testid="share"]').should('exist').and('have.text', props.share.toString());
  });

  it('displays the correct number of rating, comments, and shares', () => {
    cy.get('[data-testid="rate"]').should('have.text', '10');
    cy.get('[data-testid="comment"]').should('have.text', '5');
    cy.get('[data-testid="share"]').should('have.text', '3');
  });

  it('contains a close icon', () => {
    cy.get('[data-testid="dashboard-article-detail"]').find('svg').should('have.class', 'MuiSvgIcon-root');
  });
});
