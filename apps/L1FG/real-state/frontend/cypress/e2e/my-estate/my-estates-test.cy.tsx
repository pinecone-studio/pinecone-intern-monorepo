describe('MyEstates Page - Delete and Edit Actions', () => {
  describe('with successful query', () => {
    beforeEach(() => {
      // Intercept the GetPostById query to return a successful response.
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetPostById') {
          req.reply({
            data: {
              getPostById: {
                _id: 'post_1',
                title: 'Test Post',
                description: 'A post for testing',
                price: '100',
                propertyDetail: {
                  houseType: 'APARTMENT',
                  size: '80',
                  images: ['/image1.jpg', '/image2.jpg'],
                  totalRooms: 3,
                  garage: true,
                  restrooms: 2,
                  location: {
                    address: 'Test Address',
                    city: 'Test City',
                    district: 'Test District',
                    subDistrict: 'Test SubDistrict',
                  },
                  details: {
                    completionDate: '2020-01-01',
                    windowsCount: 5,
                    windowType: 'PVC',
                    floorMaterial: 'Wood',
                    floorNumber: 1,
                    balcony: true,
                    totalFloors: 5,
                    lift: false,
                  },
                },
                status: 'ACTIVE',
                updatedAt: '2021-01-01',
                createdAt: '2020-01-01',
              },
            },
          });
        }
      }).as('getPostByIdSuccess');

      // Visit the edit estate page for a specific post.
      cy.visit('/my-estates/post_1');
      cy.wait('@getPostByIdSuccess');
    });

    it('should handle delete post error', () => {
      // Ensure the delete button exists.
      cy.get('[data-cy="delete-post"]', { timeout: 30000 }).should('exist');

      // Intercept the DeletePost mutation to simulate an error.
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'DeletePost') {
          req.reply({
            errors: [{ message: 'Delete failed' }],
          });
        }
      }).as('deletePostError');

      // Click the delete button to open the delete modal.
      cy.get('[data-cy="delete-post"]', { timeout: 30000 }).first().click();

      // Wait for the modal overlay to appear.
      cy.get('[data-cy="delete-modal-overlay"]', { timeout: 30000 }).should('exist').and('be.visible');

      // Confirm deletion.
      cy.get('[data-cy="confirm-delete"]').click();
      cy.wait('@deletePostError');

      // Assert that an error toast appears.
      cy.get('.Toastify__toast-body', { timeout: 10000 }).should('contain.text', 'Зар устгахад алдаа гарлаа');

      // Confirm that the delete modal overlay is no longer in the DOM.
      cy.get('[data-cy="delete-modal-overlay"]').should('not.exist');
    });
  });

  describe('when query fails (error branch)', () => {
    it('should display an error message for query error (network failure)', () => {
      // Force a network error for GetPostById.
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetPostById') {
          req.reply({ forceNetworkError: true });
        }
      }).as('getPostByIdError');

      // Visit the edit estate page.
      cy.visit('/my-estates/post_1');
      cy.wait('@getPostByIdError');

      // Verify that the error element is visible and shows "Алдаа гарлаа".
      cy.get('div.text-red-500', { timeout: 10000 }).should('exist').and('be.visible').and('contain.text', 'Алдаа гарлаа');
    });

    it('should display an error message when getPostById returns null', () => {
      // Intercept GetPostById to simulate a null data response.
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetPostById') {
          req.reply({ data: { getPostById: null } });
        }
      }).as('getPostByIdNull');

      cy.visit('/my-estates/post_1');
      cy.wait('@getPostByIdNull');

      cy.get('div.text-red-500', { timeout: 10000 }).should('exist').and('be.visible').and('contain.text', 'Алдаа гарлаа');
    });
  });
});
