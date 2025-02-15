import { mockData } from 'cypress/fixtures/EditPageMockdata';

describe('Edit Estate Page - Basic Functionality', () => {
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
      cy.get('h1').should('contain', 'Үл хөдлөхийн мэдээлэл шинэчлэх');
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
      cy.get('[data-cy="description"]').should('have.value', mockData.getPostById.description);
      cy.get('[data-cy="price"]').should('have.value', mockData.getPostById.price);
      cy.get('[data-cy="houseType"]').should('have.value', mockData.getPostById.propertyDetail.houseType);
      cy.get('[data-cy="size"]').should('have.value', mockData.getPostById.propertyDetail.size);
      cy.get('[data-cy="totalRooms"]').should('have.value', mockData.getPostById.propertyDetail.totalRooms);
      cy.get('[data-cy="garage"]').should('have.value', mockData.getPostById.propertyDetail.garage.toString());
    });
  });

  describe('Location Details Section', () => {
    it('should display and allow updating location details', () => {
      const location = mockData.getPostById.propertyDetail.location;
      const updates = {
        city: 'New City',
        district: 'New District',
        subDistrict: 'New SubDistrict',
        address: '123 New Address',
      };

      Object.entries(location).forEach(([field, value]) => {
        cy.get(`[data-cy="${field}"]`).should('have.value', value);
      });

      Object.entries(updates).forEach(([field, value]) => {
        cy.get(`[data-cy="${field}"]`).clear().type(value);
      });

      Object.entries(updates).forEach(([field, value]) => {
        cy.get(`[data-cy="${field}"]`).should('have.value', value);
      });
    });
  });
});
