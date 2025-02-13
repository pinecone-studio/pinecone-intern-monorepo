describe('My Estates Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'test-token');
    });
  });

  it('displays loading state', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body?.operationName === 'GetPostsByUserId') {
        req.reply({
          delay: 1000,
          data: {
            getPosts: [],
          },
        });
      }
    }).as('getPostsLoading');

    cy.visit('/my-estates');
    cy.contains('Loading...').should('be.visible');
  });

  it('displays error state', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body?.operationName === 'GetPostsByUserId') {
        req.reply({
          forceNetworkError: true,
        });
      }
    }).as('getPostsError');

    cy.visit('/my-estates');
    cy.contains('Error:').should('be.visible');
  });

  it('displays property data with all status variations', () => {
    const statusTests = [
      {
        status: 'PENDING',
        text: 'Хүлээгдэж буй',
        bgClass: 'bg-[rgba(37,99,235,0.1)]',
        textClass: 'text-[rgba(37,99,235,1)]',
      },
      {
        status: 'APPROVED',
        text: 'Зарагдаж байгаа',
        bgClass: 'bg-green-100',
        textClass: 'text-green-800',
      },
      {
        status: 'REJECTED',
        text: 'Буцаагдсан',
        bgClass: 'bg-red-100',
        textClass: 'text-red-800',
      },
    ];

    statusTests.forEach(({ status, text, bgClass, textClass }) => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetPostsByUserId') {
          req.reply({
            data: {
              getPosts: [
                {
                  _id: '1',
                  title: 'Test Property',
                  status,
                  price: '100000000',
                  propertyDetail: {
                    images: status === 'PENDING' ? ['/test-image.jpg'] : [],
                  },
                  propertyOwnerId: {
                    _id: 'test-user-id',
                  },
                },
              ],
            },
          });
        }
      }).as(`getPosts${status}`);

      cy.visit('/my-estates');
      cy.wait(`@getPosts${status}`);

      // Check title and data
      cy.contains('h1', 'Миний зарууд').should('be.visible');
      cy.contains('Test Property').should('be.visible');
      cy.contains('100,000,000₮').should('be.visible');

      // Check status badge
      cy.contains('span', text).should('be.visible').and('have.class', bgClass).and('have.class', textClass);

      // Check image handling with Next.js image URLs
      if (status === 'PENDING') {
        cy.get(`img[alt="Test Property"]`)
          .should('have.attr', 'src')
          .and('match', /\/_next\/image\?url=%2Ftest-image\.jpg/);
      } else {
        cy.get(`img[alt="Test Property"]`)
          .should('have.attr', 'src')
          .and('match', /\/_next\/image\?url=%2Fplaceholder\.png/);
      }

      // Check action buttons
      cy.get('[data-testid="action-buttons"] button').should('have.length', 2);
    });
  });
});
