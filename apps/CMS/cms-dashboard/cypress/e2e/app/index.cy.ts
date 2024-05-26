describe('app page.tsx', () => {
  beforeEach(() => cy.visit('/'));

  it('2. it should display Main Banner', () => {
    cy.get('[data-cy="mainBannerComp"]').should('exist');
    cy.get('[data-cy="main-cover"]').should('exist').and('have.attr', 'alt');
    cy.get('[data-cy="innerComp"]')
      .should('exist')
      .and('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)) repeat scroll 0% 0% / auto padding-box border-box');
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
