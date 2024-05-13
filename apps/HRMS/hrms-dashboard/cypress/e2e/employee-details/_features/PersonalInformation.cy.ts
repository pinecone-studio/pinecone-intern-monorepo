describe('PersonalInformation Component', () => {
  beforeEach(() => {
    cy.visit('/employee-details/update/66389a107bc2c1b3a29a5585');
  });

  it('2.Sidebar menu clickable and redirect to employee details page', () => {
    cy.get('[data-cy="sidebarItem"]').eq(1).should('exist').should('be.visible');
    cy.get('[data-cy="sidebarItem"]').eq(1).click();
  });

  it('checks the main div exists', () => {
    cy.get('[data-testid="personal-info"]').should('exist');
  });
});

describe('Button Click Test', () => {
  it('opens modal when clicked', () => {
    cy.visit('/employee-details/update/66389a107bc2c1b3a29a5585');
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('exist');
  });
});

