import { ClassType } from '@/generated';

describe('DropDownMenuButton', () => {
  beforeEach(() => {
    cy.visit('/class');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetClasses') {
        req.reply({
          data: {
            getClasses: [
              {
                name: 'Test Class',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                teachers: ['Teacher 1', 'Teacher 2'],
                ClassType: ClassType.Design,
              },
            ],
          },
        });
      }
    }).as('getClasses');
    cy.wait('@getClasses');
  });

  it('renders the dropdown menu button', () => {
    cy.get('[data-testid="dropdown-menu-button"]').should('exist');
  });

  it('shows dropdown menu on hover and delete', () => {
    cy.get('[data-testid="class-card"]').first().trigger('mouseover');
    cy.get('[data-testid="more-horizontal-button"]').should('exist');
    cy.get('[data-testid="more-horizontal-button"]').click({ force: true });
    cy.get('[data-testid="edit-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').click({ force: true });

    cy.wait('@getClasses');
  });

  it('handles GraphQL errors', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'deleteClass') {
        req.reply({
          forceNetworkError: true,
        });
      }
    }).as('deleteClassError');

    cy.get('[data-testid="class-card"]').first().trigger('mouseover');
    cy.get('[data-testid="more-horizontal-button"]').should('exist');
    cy.get('[data-testid="more-horizontal-button"]').click({ force: true });
    cy.get('[data-testid="edit-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').should('exist');
    cy.get('[data-testid="delete-menu-item"]').click({ force: true });

    cy.visit('/class');
    cy.wait('@deleteClassError');
  });
});
