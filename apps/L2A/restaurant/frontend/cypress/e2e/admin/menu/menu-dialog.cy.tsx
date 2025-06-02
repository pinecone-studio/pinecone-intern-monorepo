describe('MenuDialog', () => {
  beforeEach(() => {
    cy.visit('/admin/menu'); 
    cy.get('[data-testid="tab-manage"]').click();
    cy.get('[data-testid="food-actions"]').should('exist');
  });

  it('opens and submits discount dialog', () => {
    cy.get('[data-cy="discount-trigger"]').click();
    cy.get('[data-cy="discount-dialog"]').should('exist');
    cy.get('[data-cy="discount-dialog"] input').eq(0).type('New Year Sale');
    cy.get('[data-cy="discount-dialog"] input').eq(1).type('15');
    cy.get('[data-cy="discount-submit"]').click();
  });
  it('does not submit when input is empty', () => {
    cy.get('[data-cy="menu-trigger"]').click();
    cy.get('[data-cy="menu-dialog"]').should('exist');
    cy.get('[data-cy="menu-input"]').clear();
    cy.get('[data-cy="menu-submit"]').click();

    cy.wait(1000);
    cy.get('[data-cy="menu-dialog"]').should('exist'); 
  });
  it('handles GraphQL error response', () => {
    cy.intercept('POST', '**/graphql', {
      statusCode: 200,
      body: {
        errors: [{ message: 'Mocked GraphQL error' }]
      }
    }).as('graphqlError');
  
    cy.get('[data-cy="menu-trigger"]').click();
    cy.get('[data-cy="menu-dialog"]').should('exist');
    cy.get('[data-cy="menu-input"]').type('Invalid Name');
    cy.get('[data-cy="menu-submit"]').click();
  
    cy.wait('@graphqlError');
  });
    

  it('submits menu form and shows success message', () => {
    cy.intercept('POST', '**/graphql', {
      statusCode: 200,
      body: {
        data: {
          addCategory: {
            _id: '1',
            name: 'Шинэ ангилал'
          }
        }
      }
    }).as('graphql');

    cy.get('[data-cy="menu-trigger"]').click();
    cy.get('[data-cy="menu-dialog"]').should('exist');
    cy.get('[data-cy="menu-input"]').type('Шинэ ангилал');
    cy.get('[data-cy="menu-submit"]').click();

    cy.wait('@graphql');
    cy.contains('Амжилттай нэмэгдлээ!').should('be.visible');
    cy.wait(3100);
    cy.contains('Амжилттай нэмэгдлээ!').should('not.exist');
  });
});