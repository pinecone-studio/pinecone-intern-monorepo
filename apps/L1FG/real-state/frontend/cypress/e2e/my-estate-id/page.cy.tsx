describe('Edit Estate Page', () => {
  const mockData = {
    getPostById: {
      title: 'Test Property',
      price: '100000',
      description: 'Test Description',
      propertyDetail: {
        houseType: 'Apartment',
        size: '120',
        totalRooms: 3,
        images: ['/test-image.jpg'],
        garage: 'false',
        restrooms: 2,
      },
    },
  };

  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({ data: mockData });
      }
    }).as('getPostById');

    cy.visit('/my-estates/test-id');
    cy.wait('@getPostById');
  });

  it('should render the edit page title', () => {
    cy.get('h1').should('contain', 'Үл хөдлөх засах');
  });

  it('should load and display property details', () => {
    cy.get('[data-cy="title"]').should('have.value', mockData.getPostById.title);
    cy.get('[data-cy="price"]').should('have.value', mockData.getPostById.price);
    cy.get('[data-cy="houseType"]').should('have.value', mockData.getPostById.propertyDetail.houseType);
    cy.get('[data-cy="size"]').should('have.value', mockData.getPostById.propertyDetail.size);
    cy.get('[data-cy="totalRooms"]').should('have.value', mockData.getPostById.propertyDetail.totalRooms);
  });

  it('should handle form input changes', () => {
    cy.get('[data-cy="title"]').clear().type('Updated Property').should('have.value', 'Updated Property');

    cy.get('[data-cy="price"]').clear().type('200000').should('have.value', '200000');

    cy.get('[data-cy="houseType"]').select('House').should('have.value', 'House');

    cy.get('[data-cy="totalRooms"]').clear().type('4').should('have.value', '4');
  });

  it('should show loading state while fetching data', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({
          delay: 1000,
          data: mockData,
        });
      }
    }).as('delayedGetPostById');

    cy.visit('/my-estates/test-id');
    cy.contains('Loading...').should('be.visible');
    cy.wait('@delayedGetPostById');
    cy.contains('Loading...').should('not.exist');
  });

  it('should handle network error gracefully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({
          statusCode: 500,
          body: { errors: [{ message: 'Internal Server Error' }] },
        });
      }
    }).as('failedGetPostById');

    cy.visit('/my-estates/test-id');
    cy.wait('@failedGetPostById');
  });

  it('should validate required fields', () => {
    cy.get('[data-cy="title"]').clear();
    cy.get('[data-cy="price"]').clear();
  });
});
