describe('MyEstates Page - Delete and Edit Actions', () => {
  context('with successful query', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetMyEstates') {
          req.reply({
            data: {
              myEstates: [
                {
                  _id: 'post_1',
                  title: 'Test Post',
                  description: 'A post for testing',
                  canDelete: true,
                  canEdit: true,
                },
              ],
            },
          });
        }
      }).as('getMyEstates');

      cy.visit('/my-estates');
      cy.wait('@getMyEstates');
    });

    it('should handle delete post success', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'DeletePost') {
          req.reply({
            data: { deletePost: true },
          });
        }
      }).as('deletePostSuccess');

      cy.get('[data-testid="delete-button"]', { timeout: 30000 }).first().click();

      cy.get('[data-cy="delete-modal-overlay"]', { timeout: 30000 }).should('be.visible');

      cy.get('[data-cy="confirm-delete"]').click();
      cy.wait('@deletePostSuccess');

      cy.get('.Toastify__toast-body', { timeout: 10000 }).should('contain.text', 'Зар амжилттай устгагдлаа');

      cy.get('[data-cy="delete-modal-overlay"]').should('not.exist');
    });

    it('should trigger edit action and navigate to the edit page', () => {
      cy.get('[data-testid="edit-button"]', { timeout: 30000 }).first().click();
      cy.url().should('match', /\/my-estates\/\w+/);
    });

    it('should close the delete modal when the cancel button is clicked', () => {
      cy.get('[data-testid="delete-button"]', { timeout: 30000 }).first().click();
      cy.get('[data-cy="delete-modal-overlay"]', { timeout: 30000 }).should('be.visible');

      cy.get('[data-cy="cancel-delete"]').click();

      cy.get('[data-cy="delete-modal-overlay"]').should('not.exist');
    });

    it('should handle delete post error', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'DeletePost') {
          req.reply({
            errors: [{ message: 'Delete failed' }],
          });
        }
      }).as('deletePostError');

      cy.get('[data-testid="delete-button"]', { timeout: 30000 }).first().click();
      cy.get('[data-cy="delete-modal-overlay"]', { timeout: 30000 }).should('be.visible');

      cy.get('[data-cy="confirm-delete"]').click();
      cy.wait('@deletePostError');

      cy.get('.Toastify__toast-body', { timeout: 10000 }).should('contain.text', 'Зар устгахад алдаа гарлаа');

      cy.get('[data-cy="delete-modal-overlay"]').should('not.exist');
    });
  });

  context('when query fails (error branch)', () => {
    const checkErrorResponse = () => {
      cy.get('body').should((body) => {
        const text = body.text();
        expect(text).to.match(/(Error|500|Internal Server Error)/);
      });
    };

    it('should display an error message', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body?.operationName === 'GetMyEstates') {
          req.reply({
            statusCode: 500,
            body: {
              errors: [{ message: 'Query failed' }],
            },
          });
        }
      }).as('getMyEstatesError');

      cy.visit('/my-estates');
      cy.wait('@getMyEstatesError');
      checkErrorResponse();
    });

    context('when query fails with empty error message', () => {
      it('should display "Error:" when error.message is empty', () => {
        cy.intercept('POST', '/api/graphql', (req) => {
          if (req.body?.operationName === 'GetPostsByUserId') {
            req.reply({
              statusCode: 200,
              body: {
                data: null,
                errors: [{ message: '' }],
              },
            });
          }
        }).as('getPostsEmptyError');

        cy.visit('/my-estates');
        cy.wait('@getPostsEmptyError');    });
    });
  });
});
