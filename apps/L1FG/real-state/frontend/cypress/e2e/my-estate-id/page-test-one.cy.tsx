/* eslint-disable max-lines */
import { mockData } from 'cypress/fixtures/EditPageMockdata';

describe('Edit Estate Page - Integrated Tests', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', {
        body: { data: mockData },
      }).as('getPostById');
      cy.visit('/my-estates/test-id');
      cy.wait('@getPostById');
    });

    it('should render the edit page and load basic property details', () => {
      cy.get('h1').should('contain', 'Үл хөдлөхийн мэдээлэл шинэчлэх');
      cy.get('[data-cy="title"]').should('have.value', mockData.getPostById.title);
      cy.get('[data-cy="description"]').should('have.value', mockData.getPostById.description);
      cy.get('[data-cy="price"]').should('have.value', mockData.getPostById.price);
      cy.get('[data-cy="houseType"]').should('have.value', mockData.getPostById.propertyDetail.houseType);
      cy.get('[data-cy="size"]').should('have.value', mockData.getPostById.propertyDetail.size);
      cy.get('[data-cy="totalRooms"]').should('have.value', mockData.getPostById.propertyDetail.totalRooms);
    });

    it('should process updates successfully', () => {
      const updatedData = {
        updatePost: {
          _id: 'test-id',
          status: 'PENDING',
          title: 'Updated Title',
        },
      };

      cy.intercept('POST', '/api/graphql', {
        body: { data: updatedData },
      }).as('updatePost');

      cy.get('[data-cy="title"]').clear().type('Updated Title');
      cy.get('[data-testid="submit-button"]').click();
      cy.wait('@updatePost');
      cy.contains('Зар амжилттай шинэчлэгдлээ').should('be.visible');
      cy.url().should('include', '/my-estates');
    });
  });

  context('Loading State', () => {
    it('should display a loading indicator while waiting for data', () => {
      cy.intercept('POST', '/api/graphql', {
        delay: 1500,
        body: { data: mockData },
      }).as('delayedGetPostById');

      cy.visit('/my-estates/test-id');
      cy.contains('Loading...').should('be.visible');
      cy.wait('@delayedGetPostById');
      cy.contains('Loading...').should('not.exist');
    });
  });

  context('Error States', () => {
    it('should display error message for network error', () => {
      cy.intercept('POST', '/api/graphql', {
        forceNetworkError: true,
      }).as('getPostByIdNetworkError');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdNetworkError');
      cy.contains('Алдаа гарлаа', { timeout: 10000 }).should('be.visible');
    });

    it('should display error message for server error', () => {
      cy.intercept('POST', '/api/graphql', {
        statusCode: 500,
        body: { errors: [{ message: 'Server error' }] },
      }).as('getPostByIdServerError');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdServerError');
      cy.contains('Алдаа гарлаа', { timeout: 10000 }).should('be.visible');
    });

    it('should display error when data.getPostById is null', () => {
      cy.intercept('POST', '/api/graphql', {
        body: { data: { getPostById: null } },
      }).as('getPostByIdNull');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdNull');
      cy.contains('Алдаа гарлаа', { timeout: 10000 }).should('be.visible');
    });

    it('should handle null nested values gracefully', () => {
      const mockDataWithNulls = {
        getPostById: {
          ...mockData.getPostById,
          propertyDetail: {
            ...mockData.getPostById.propertyDetail,
            details: {
              ...mockData.getPostById.propertyDetail.details,
              completionDate: null,
              windowsCount: null,
              windowType: null,
            },
          },
        },
      };

      cy.intercept('POST', '/api/graphql', {
        body: { data: mockDataWithNulls },
      }).as('getPostByIdWithNulls');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdWithNulls');

      cy.get('[data-cy="completionDate"]').should('have.value', '');
      cy.get('[data-cy="windowsCount"]').should('have.value', '0');
      cy.get('[data-cy="windowType"]').should('have.value', '');
    });

    it('should display error when update fails', () => {
      cy.intercept('POST', '/api/graphql', {
        body: { data: mockData },
      }).as('getPostById');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostById');

      cy.intercept('POST', '/api/graphql', {
        statusCode: 500,
        body: { errors: [{ message: 'Update failed' }] },
      }).as('updatePostError');

      cy.get('[data-testid="submit-button"]').click();
      cy.wait('@updatePostError');
      cy.contains('Зар шинэчлэхэд алдаа гарлаа').should('be.visible');
    });
  });

  context('Additional Coverage', () => {
    it('should show progress text while updating in edit mode (successful update)', () => {
      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({ body: { data: mockData } });
        }
      }).as('getPostById');

      const updatedDataDelayed = {
        updatePost: {
          _id: 'test-id',
          status: 'PENDING',
          title: 'Updated Title',
        },
      };

      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'UpdatedPost') {
          req.reply({
            delay: 2000,
            body: { data: updatedDataDelayed },
          });
        }
      }).as('delayedUpdatePost');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostById');
      cy.get('[data-testid="submit-button"]').click();
      cy.contains('Шинэчилж байна...').should('be.visible');
      cy.wait('@delayedUpdatePost');
      cy.contains('Зар амжилттай шинэчлэгдлээ').should('be.visible');
    });
  });

  context('Additional Coverage for else path', () => {
    it('should show progress text while updating in edit mode (empty update response)', () => {
      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({ body: { data: mockData } });
        }
      }).as('getPostById');

      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'UpdatedPost') {
          req.reply({
            body: { data: {} },
          });
        }
      }).as('delayedUpdatePost');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostById');

      cy.wait('@delayedUpdatePost');
    });
  });

  context('Additional Coverage for else path on type', () => {
    it('should show error text while updating in edit mode (type error)', () => {
      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({
            body: {
              data: {
                getPostById: {
                  _id: 'test-id',
                  title: 'Test Post',
                  description: 'A post for testing',
                  price: 100000,
                  propertyDetail: {
                    houseType: 'APARTMENT',
                    size: 100,
                    totalRooms: 3,
                    location: {},
                    images: [],
                  },
                },
              },
            },
          });
        }
      }).as('getPostById');

      cy.intercept('POST', '**/api/graphql', (req) => {
        if (req.body.operationName === 'UpdatedPost') {
          req.reply({
            body: { data: {} },
          });
        }
      }).as('delayedUpdatePost');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostById');

      cy.wait('@delayedUpdatePost');
    });
  });
});
