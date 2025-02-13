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
        location: {
          city: 'Test City',
          district: 'Test District',
          subDistrict: 'Test SubDistrict',
          address: 'Test Address',
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
    it('should load and display property details', () => {
      cy.get('[data-cy="title"]').should('have.value', mockData.getPostById.title);
      cy.get('[data-cy="price"]').should('have.value', mockData.getPostById.price);
      cy.get('[data-cy="houseType"]').should('have.value', mockData.getPostById.propertyDetail.houseType);
      cy.get('[data-cy="size"]').should('have.value', mockData.getPostById.propertyDetail.size);
      cy.get('[data-cy="totalRooms"]').should('have.value', mockData.getPostById.propertyDetail.totalRooms);
    });

    it('should handle property details input changes', () => {
      cy.get('[data-cy="title"]').clear().type('Updated Property').should('have.value', 'Updated Property');

      cy.get('[data-cy="price"]').clear().type('200000').should('have.value', '200000');
    });
  });

  describe('Description Section', () => {
    it('should load and display description', () => {
      cy.get('[data-cy="description"]').should('have.value', mockData.getPostById.description);
    });

    it('should handle description changes', () => {
      cy.get('[data-cy="description"]').clear().type('Updated description').should('have.value', 'Updated description');
    });
  });

  describe('Location Details Section', () => {
    it('should load and display location details', () => {
      cy.get('[data-cy="city"]').should('have.value', mockData.getPostById.propertyDetail.location.city);
      cy.get('[data-cy="district"]').should('have.value', mockData.getPostById.propertyDetail.location.district);
      cy.get('[data-cy="subDistrict"]').should('have.value', mockData.getPostById.propertyDetail.location.subDistrict);
      cy.get('[data-cy="address"]').should('have.value', mockData.getPostById.propertyDetail.location.address);
    });

    it('should handle location input changes', () => {
      cy.get('[data-cy="city"]').clear().type('New City').should('have.value', 'New City');

      cy.get('[data-cy="address"]').clear().type('New Address').should('have.value', 'New Address');
    });
  });

  describe('Error Handling', () => {
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
  });
});
