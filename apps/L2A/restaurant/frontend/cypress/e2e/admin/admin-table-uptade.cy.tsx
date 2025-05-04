describe('AdminTableList dummy edit dialog', () => {
  beforeEach(() => {
    cy.visit('/admin/table');
  });

  it('renders classrooms', () => {
    cy.get('[data-testid="classroom-row-1"]').should('exist');
    cy.get('[data-testid="classroom-row-2"]').should('exist');
  });

  it('renders classroom names', () => {
    cy.get('[data-testid="classroom-name-1"]').should('contain.text', '1A');
    cy.get('[data-testid="classroom-name-2"]').should('contain.text', '1B');
  });

  it('clicks QR, edit,  buttons', () => {
    cy.get('[data-testid="classroom-1-qr-button"]').click();
    cy.get('[data-testid="classroom-1-edit-button"]').click();
  });

  it('opens update dialog and types new table name', () => {
    cy.get('[data-testid="classroom-1-edit-button"]').click();
    cy.get('[data-testid="classroom-1-dialog"]').should('exist');
    cy.get('[data-testid="classroom-1-input"]').type('Updated Table').should('have.value', 'Updated Table');
    cy.get('[data-testid="classroom-1-update-button"]').click();
  });
});
