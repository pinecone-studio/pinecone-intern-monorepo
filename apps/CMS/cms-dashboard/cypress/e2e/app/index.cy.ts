describe('app page.tsx', () => {
  beforeEach(() => cy.visit('/'));
  it('1. it should display both options of ternary', () => {
    cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
      const hasOperationName = (req: any, operationName: any) => {
        const { body } = req;
        return Object.prototype.hasOwnProperty.call(body, 'operationName') && body.operationName === operationName;
      };

      if (hasOperationName(req, 'GetArticlesByCategory')) {
        req.alias = 'gqlGetArticlesByCategory';

        req.reply((res) => {
          res.body.data.GetArticlesByCategory.coverPhoto = null;
        });
      }
    });

    //   cy.get('[data-cy="article-cover"]').should('have.attr',"src".toString,'/earth.jpeg')
  });

  it('2. it should display Main Banner', () => {
    cy.get('[data-cy="mainBannerComp"]').should('exist');
    cy.get('[data-cy="main-cover"]').should('exist').and('have.attr', 'alt');
    cy.get('[data-cy="innerComp"]')
      .should('exist')
      .and(
        'have.css',
        'background',
        'rgba(0, 0, 0, 0) linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(0, 0, 2) 29%, rgb(0, 0, 0) 40%, rgba(255, 255, 255, 0) 100%) repeat scroll 0% 0% / auto padding-box border-box'
      );
    cy.get('[data-cy="main-date"]').should('exist');
    cy.get('[data-cy="main-categories"]').should('exist');
    cy.get('[data-cy="articlesTitle"]').should('exist');
    cy.get('[data-cy="mainBtn"]').should('exist').click();
  });

  it('3. it should display GroupArticlesComp ', () => {
    cy.get('[data-cy="group-container"]').should('exist').and('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('[data-cy="group-title"]').should('exist');
    cy.get('[data-cy="group-grid"]').should('exist');
    cy.get('[data-cy="group-icon-button"]').should('exist').click({ multiple: true });
    cy.get('[data-cy="article-main-container"]').should('be.visible');

    // cy.wait('@gqlGetArticlesByCategory').its('response.body.data.getArticlesByCategory.coverPhoto').should('/earth.jpeg');
  });
});
