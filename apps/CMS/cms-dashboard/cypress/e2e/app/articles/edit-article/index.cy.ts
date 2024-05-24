const mockedArticleForEditArticle = {
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

const mockedArticle = {
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
};
describe('Edit article page', () => {
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
            data: { getArticlesByPaginate: mockedArticleForEditArticle },
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

    // 1. Should visit edit-article/[id]
    cy.get('[data-cy="article-edit-button-cy-id"]', { timeout: 5000 }).eq(0).should('exist').click({ force: true });

    //

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetArticleById') {
        req.reply((res) => {
          res.send({
            data: { getArticleById: mockedArticle },
          });
        });
      }
    }).as('getArticle');

    cy.wait('@getArticle');
    // 2. Should be visile edit-article page
    cy.get('[data-cy="edit-article-page-cy"]', { timeout: 5000 }).should('exist');

    // 3. Should be visible Input label component
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Гарчиг');
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Нийтлэл');
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Ангилал');

    // 4. Should be visible Title input component and shows error message
    cy.get('[data-cy="title-input-cy-id"]').should('exist').clear();
    cy.get('[data-cy="content-input-cy-id"]').should('exist').click({ force: true });
    cy.get('[data-cy="helper-text-cy-id"]').should('contain', 'Нийтлэлийн гарчиг хоосон байж болохгүй');

    // 5. Should disappear Title input component's error message
    cy.get('[data-cy="title-input-cy-id"]').type('porsche ustgaj bolohgui !!! ner solij bolohgui !!!');
    cy.contains('Нийтлэлийн гарчиг хоосон байж болохгүй').should('not.exist');

    // 6. Should be visible Content input component and shows error message
    cy.get('[data-cy="content-input-cy-id"]').should('exist').clear();
    cy.get('[data-cy="category-select-input-select-button-cy-id"]').should('exist').select([0]);
    cy.get('[data-cy="helper-text-cy-id"]').should('contain', 'Нийтлэлийн эх хоосон байж болохгүй');

    // 7. Should disappear Content input component's error message
    cy.get('[data-cy="content-input-cy-id"]').type('this is porsche cypress test content');
    cy.contains('Нийтлэлийн эх хоосон байж болохгүй').should('not.exist');

    // 8. Should change cover photo

    // 9. Should change comment permission on Toggle button for comment
    cy.get('[data-cy="comment-permission-check-box-cy-id"]').should('exist').check();

    // 11. Should display toast message and redirect to /dashboard page when click on "Шинэчлэх" button
    cy.contains('Шинэчлэх').should('exist').click({ force: true });
    cy.contains('Successfully updated', { timeout: 5000 }).should('exist');

    // // 10. Should redirect to /dashboard page when click on "Болих" button
    cy.get('[data-cy="article-edit-button-cy-id"]', { timeout: 5000 }).eq(0).should('exist').click({ force: true });
    cy.contains('Болих').should('exist').click({ force: true });
  });
});
