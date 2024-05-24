const mockedArticlesByPaginate = {
  articles: [
    {
      id: '661c87fd6837efa536464d24',
      title: 'porsche ustgaj bolohgui !!! ner solij bolohgui !!!',
      coverPhoto: '',
      content: 'this is porsche cypress test content',
      author: {
        name: 'Хэрэглэгч',
      },
      category: {
        name: 'Hollywood',
      },
      status: 'ARCHIVED',
      slug: 'metahasnewimage',
      commentPermission: true,
      createdAt: '2024-04-10T00:32:42.154Z',
      publishedAt: '2024-04-18T00:32:42.154Z',
      updatedAt: null,
      scheduledAt: null,
    },
  ],
  totalArticles: 1,
};

describe('dashboard page', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });
  // ArticleStatusTabs feature
  it('1. ArticleStatusTabs must be defined', () => {
    cy.get('[data-cy="article-status-tabs-feature-cy-id"]').should('exist');
  });

  // SearchInput component
  it('2. SearchInput component must be defined', () => {
    cy.get('[data-cy="search-input-cy-id"]').should('exist');
  });

  // AdminNavigateLinksFeature
  it('3. AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });

  it('4. Dashboard table must be defined after data fetches', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetArticlesByPaginate') {
        req.reply((res) => {
          res.send({
            data: { getArticlesByPaginate: mockedArticlesByPaginate },
          });
        });
      }
    }).as('getArticles');

    cy.wait('@getArticles');

    cy.get('[data-cy="dashboard-table-cy"]').should('exist').should('be.visible');
    // Filter by date must be defined
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
    // Navbar must be defined
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');
    // Dashboard table
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');
    // Morevert button click
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });
    // Pagination component
    cy.get('[data-cy="pagination-cy-id"]').eq(0).should('exist').click();
  });
});
