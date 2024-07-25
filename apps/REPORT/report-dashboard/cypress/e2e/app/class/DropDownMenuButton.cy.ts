describe('DropDownMenuButton', () => {
  beforeEach(() => {
    cy.visit('/class');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          data: {
            getClasses: [
              {
                _id: '1',
                __typename: 'Class',
                name: 'Test Class',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                teachers: ['Teacher 1', 'Teacher 2'],
              },
            ],
          },
        });
      }
    }).as('getClass');

    // Wait for the classes to load
    cy.wait('@getClass');
  });

  it('renders the dropdown menu button and refetch', () => {
    cy.get('[data-testid="dropdown-menu-button"]').should('exist');
  });

  it('shows dropdown menu on hover and delete', () => {
    cy.get('[data-testid="class-card"]').first().trigger('mouseover');
    cy.get('[data-testid="more-horizontal-button"]').should('exist');
    cy.get('[data-testid="more-horizontal-button"]').click({ force: true });
    cy.get('[data-testid="edit-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').click({ force: true });
    cy.wait('@getClass');
  });
});
