describe('TableSemiHeader E2E', () => {
  beforeEach(() => {
    cy.visit("/admin/table");
  });

  it('renders header and button', () => {
    cy.get('[data-testid="header-title"]').should('contain', 'Ширээ');
    cy.get('[data-testid="add-table-button"]').should('exist');
  });

  it('opens dialog and closes it', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="dialog-content"]').should('be.visible');

    // Close the dialog
    cy.get('body').type('{esc}');
    cy.get('[data-testid="dialog-content"]').should('not.exist');
  });

  it('shows error toast on empty submission', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="create-button"]').click();
    cy.get('[data-sonner-toast]').should('contain', 'Ширээний нэр хоосон байна');
  });

  it('creates table, generates QR and shows download', () => {
    // Intercept GraphQL + QR code
    cy.intercept('POST', '**/graphql', {
      body: {
        data: {
          addTable: { _id: 'abcde123' },
        },
      },
    }).as('addTable');

    // Mock QRCode (we don't actually generate it here)
    cy.window().then((win) => {
      cy.stub(win.URL, 'createObjectURL').returns('blob:fakeqr');
    });

    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Cypress Table');
    cy.get('[data-testid="create-button"]').click();

    // Wait for the GraphQL + QR generation
    cy.wait('@addTable');

    // Check QR wrapper & download
    cy.get('[data-testid="qr-wrapper"]').should('be.visible');
    cy.get('[data-testid="qr-image"]').should('have.attr', 'src').and('include', 'data:image');
    cy.get('[data-testid="qr-download-button"]').should('be.visible');
  });
});
