import { hasOperationName } from 'cypress/support/app.po';

describe('Concert Search Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'GetConcerts')) {
        console.log(req.body);
      }
    }).as('gqlGetConcerts');
    cy.visit('/search');
    cy.wait('@gqlGetConcerts');
  });

  it('should display all concerts when no filters are applied', () => {
    cy.get('[data-cy="page-search-input"]').should('be.visible');
    cy.get('[data-cy="page-search-input"]').should('have.value', '');
    cy.get('[data-cy="card-item"]').first().should('be.visible');
  });

  it('should display concert when search', () => {
    cy.get('[data-cy="page-search-input"]').type('The Dark Side of the Moon');
    cy.get('[data-cy="page-search-input"]').should('have.value', 'The Dark Side of the Moon');
    cy.get('[data-cy="card-item"]').first().should('be.visible');
  });
  it('should show "concerts not found" when no concerts match filters', () => {
    cy.get('[data-cy="page-open-table-btn"]').click();
    cy.get('[data-cy="selected-date"]').should('be.visible');
    cy.get('[data-cy="selected-date"]').type('2025-01-30');
    cy.contains('Илэрц олдсонгүй').should('be.visible');
  });
  it('should filter concerts by selected date', () => {
    cy.get('[data-cy="page-open-table-btn"]').click();
    cy.get('[data-cy="selected-date"]').should('be.visible');
    cy.get('[data-cy="selected-date"]').contains('25').click();
    cy.get('[data-cy="card-item"]').first().should('be.visible');
  });
});
