const mockedArticles = {
  getArticles: [
    {
      _id: '661c87fd6837efa536464d24',
      title: 'porsche ustgaj bolohgui !!! ner solij bolohgui !!!',
      coverPhoto: '',
      content: 'this cypress test content',
      author: {
        name: 'Хэрэглэгч',
      },
      category: [
        {
          name: 'Hollywood',
        },
      ],
      status: 'ARCHIVED',
      slug: 'metahasnewimage',
      commentPermission: true,
      createdAt: '2024-04-10T00:32:42.154Z',
      publishedAt: '2024-04-18T00:32:42.154Z',
      updatedAt: null,
      scheduledAt: null,
    },
  ],
};

describe('Dashboard page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetArticles') {
        req.reply((res) => {
          res.send({
            data: mockedArticles,
          });
        });
      }
    }).as('getArticles');
    
    cy.visit('/dashboard');
    cy.wait('@getArticles');
  });

  it('1. AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });

  it('2. Dashboard table must be defined after data fetches', () => {
    cy.get('[data-cy="dashboard-table-cy"]').should('exist').should('be.visible');
    cy.get('[data-cy="table-content-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="tablerow-test-cy"]').should('exist').should('be.visible');
  });

  it('3. TableRow should render article data correctly', () => {
    cy.get('[data-cy="tablerow-test-cy"]').within(() => {
      cy.contains('porsche ustgaj bolohgui !!! ner solij bolohgui !!!').should('exist');
      cy.contains('Архив').should('exist');
      cy.contains('10.04.2024').should('exist');
      cy.contains('Hollywood').should('exist');
    });
  });

  

  it('4. Morevert button should be clickable', () => {
    cy.get('[data-cy="tablerow-test-cy"]').within(() => {
      cy.get('[data-cy="MdMoreVert-button-test-cy"]').first().click(); // Assuming the Morevert button is the first button
      // Add assertions for what should happen after clicking the button
    });
  });

  it('5. ArticleEditButton should be clickable', () => {
    cy.get('[data-cy="tablerow-test-cy"]').within(() => {
      cy.get('[data-cy="ArticleEditButton-test-cy"]').click();
      // Add assertions for what should happen after clicking the button
    });
  });
});
