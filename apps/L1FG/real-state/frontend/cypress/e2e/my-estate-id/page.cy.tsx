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
        images: ['/test-image.jpg', '/another-image.png'],
        garage: 'false',
        restrooms: 2,
        location: {
          city: 'Test City',
          district: 'Test District',
          subDistrict: 'Test SubDistrict',
          address: 'Test Address',
        },
        details: {
          completionDate: '2025-01-01',
          windowsCount: 4,
          windowType: 'Double Glass',
          floorMaterial: 'Hardwood',
          floorNumber: 2,
          totalFloors: 10,
          balcony: true,
          lift: true,
        },
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

  describe('Page Layout', () => {
    it('should render the edit page title', () => {
      cy.get('h1').should('contain', 'Үл хөдлөх засах');
    });

    it('should show loading state initially', () => {
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
  });

  describe('Property Details Section', () => {
    it('should load and display basic property details', () => {
      cy.get('[data-cy="title"]').should('have.value', mockData.getPostById.title);
      cy.get('[data-cy="price"]').should('have.value', mockData.getPostById.price);
      cy.get('[data-cy="houseType"]').should('have.value', mockData.getPostById.propertyDetail.houseType);
      cy.get('[data-cy="size"]').should('have.value', mockData.getPostById.propertyDetail.size);
      cy.get('[data-cy="totalRooms"]').should('have.value', mockData.getPostById.propertyDetail.totalRooms);
    });
  });

  describe('Windows Section', () => {
    it('should display completion date, windows count, and window type', () => {
      cy.get('[data-cy="completionDate"]').should('have.value', '2025-01-01');
      cy.get('[data-cy="windowsCount"]').should('have.value', '4');
      cy.get('[data-cy="windowType"]').should('have.value', 'Double Glass');
    });

    it('should allow modifying the completion date', () => {
      cy.get('[data-cy="completionDate"]').clear().type('2030-12-31').should('have.value', '2030-12-31');
    });
  });

  describe('Images Section', () => {
    it('should display existing images', () => {
      cy.get('[data-cy="images-section"]').find('img').should('have.length', 2);
      cy.get('[data-cy="images-section"] img').first().should('have.attr', 'src', '/test-image.jpg');
      cy.get('[data-cy="images-section"] img').last().should('have.attr', 'src', '/another-image.png');
    });
  });

  describe('Location Details Section', () => {
    it('should allow updating city and address', () => {
      cy.get('[data-cy="city"]').clear().type('New City').should('have.value', 'New City');
      cy.get('[data-cy="address"]').clear().type('123 Updated Address').should('have.value', '123 Updated Address');
    });
  });

  describe('Empty Completion Date', () => {
    it('should fall back to empty string when completionDate is null', () => {
      const mockDataNoCompletionDate = {
        getPostById: {
          ...mockData.getPostById,
          propertyDetail: {
            ...mockData.getPostById.propertyDetail,
            details: {
              ...mockData.getPostById.propertyDetail.details,
              completionDate: null,
            },
          },
        },
      };

      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({ data: mockDataNoCompletionDate });
        }
      }).as('getPostByIdNoDate');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdNoDate');

      cy.get('[data-cy="completionDate"]').should('have.value', '');
    });
  });

  describe('Error Handling', () => {
    it('should handle a network error gracefully', () => {
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
  });
});
