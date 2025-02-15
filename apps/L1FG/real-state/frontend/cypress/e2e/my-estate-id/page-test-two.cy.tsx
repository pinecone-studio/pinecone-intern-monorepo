import { mockData } from 'cypress/fixtures/EditPageMockdata';

describe('Edit Estate Page - Error Handling', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetPostById') {
        req.reply({ data: mockData });
      }
    }).as('getPostById');
  });

  describe('Update Functionality', () => {
    it('should handle successful update', () => {
      const updatedData = {
        updatePost: {
          _id: 'test-id',
          status: 'PENDING',
          title: 'Updated Title',
        },
      };

      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'UpdatedPost') {
          req.reply({ data: updatedData });
        }
      }).as('updatePost');

      cy.visit('/my-estates/test-id');
      cy.get('[data-cy="title"]').clear().type('Updated Title');
      cy.get('[data-cy="update-post"]').click();
      cy.wait('@updatePost');
      cy.contains('Зар амжилттай шинэчлэгдлээ').should('be.visible');
      cy.url().should('include', '/my-estates');
    });

    it('should handle update errors', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'UpdatedPost') {
          req.reply({
            statusCode: 500,
            body: { errors: [{ message: 'Update failed' }] },
          });
        }
      }).as('updatePostError');

      cy.visit('/my-estates/test-id');
      cy.get('[data-cy="update-post"]').click();
      cy.wait('@updatePostError');
      cy.contains('Зар шинэчлэхэд алдаа гарлаа').should('be.visible');
    });
  });

  describe('Error States', () => {
    it('should handle loading errors', () => {
      // Force network error must be used alone
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({ forceNetworkError: true });
        }
      }).as('failedGetPostById');

      cy.visit('/my-estates/test-id');

      // Wait for failed request
      cy.wait('@failedGetPostById');

      // Add retry and timeout for error message
      cy.contains('Алдаа гарлаа', { timeout: 10000 }).should('be.visible');
    });

    // Alternative test for API error response
    it('should handle API errors', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({
            statusCode: 500,
            body: {
              errors: [{ message: 'Failed to load post' }],
            },
          });
        }
      }).as('apiError');

      cy.visit('/my-estates/test-id');
      cy.wait('@apiError');
      cy.contains('Алдаа гарлаа', { timeout: 10000 }).should('be.visible');
    });

    it('should handle null values in response', () => {
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

      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.operationName === 'GetPostById') {
          req.reply({ data: mockDataWithNulls });
        }
      }).as('getPostByIdWithNulls');

      cy.visit('/my-estates/test-id');
      cy.wait('@getPostByIdWithNulls');

      cy.get('[data-cy="completionDate"]').should('have.value', '');
      cy.get('[data-cy="windowsCount"]').should('have.value', '0');
      cy.get('[data-cy="windowType"]').should('have.value', '');
    });
  });
});
