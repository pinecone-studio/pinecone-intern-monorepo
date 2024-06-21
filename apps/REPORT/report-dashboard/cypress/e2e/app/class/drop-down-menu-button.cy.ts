// cypress/integration/dropdownMenuButton.spec.js

describe('DropDownMenuButton Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('opens dropdown menu and clicks Edit', () => {
    cy.get('[data-testid="dropdown-menu-button"]').click();

    cy.get('[data-testid="dropdown-menu-content"]').should('be.visible');

    cy.contains('Засах').click();
  });

  it('opens dropdown menu and clicks Delete', () => {
    cy.get('[data-testid="dropdown-menu-button"]').click();

    cy.get('[data-testid="dropdown-menu-content"]').should('be.visible');

    cy.contains('Устгах').click();
  });
});
