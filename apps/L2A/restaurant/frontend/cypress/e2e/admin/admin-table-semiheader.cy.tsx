describe('TableSemiHeader E2E', () => {
  beforeEach(() => {
    cy.visit('/admin/table');
  });
  it('renders header and button', () => {
    cy.get('[data-testid="header-title"]').should('contain', 'Ширээ');
    cy.get('[data-testid="add-table-button"]').should('exist');
  });
  it('opens dialog and closes it with Escape key', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="dialog-content"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="dialog-content"]').should('not.exist');
  });
  it('shows error toast on empty submission', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="create-button"]').click();
    cy.get('[data-sonner-toast]').should('contain', 'Ширээний нэр хоосон байна');
  });
  it('shows error toast when GraphQL fails', () => {
    cy.intercept('POST', '**/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Internal server error' }] },
    }).as('addTableError');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Fail Table');
    cy.get('[data-testid="create-button"]').click();
    cy.wait('@addTableError');
    cy.get('[data-sonner-toast]').should('contain', 'Серверийн алдаа. Дахин оролдоно уу.');
  });
  it('creates table successfully, generates QR, and shows download', () => {
    cy.intercept('POST', '**/graphql', {
      body: {
        data: {
          addTable: { _id: 'abcde123' },
        },
      },
    }).as('addTable');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Cypress Table');
    cy.get('[data-testid="create-button"]').click();
    cy.wait('@addTable');
    cy.get('[data-sonner-toast]').should('contain', 'Ширээ амжилттай нэмэгдлээ!');
    cy.get('[data-testid="qr-wrapper"]').should('be.visible');
    cy.get('[data-testid="qr-instruction"]').should('contain', 'Ширээний QR код:');
    cy.get('[data-testid="qr-image"]').should('have.attr', 'src').and('include', 'data:image');
    cy.get('[data-testid="qr-download-link"]').should('have.attr', 'href').and('include', 'data:image');
    cy.get('[data-testid="qr-download-link"]').should('have.attr', 'download').and('include', 'Cypress Table-qr.png');

    cy.get('[data-testid="qr-download-button"]').should('be.visible');
  });
  it('resets the form when dialog is closed', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Temp Table');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').should('have.value', '');
    cy.get('[data-testid="qr-wrapper"]').should('not.exist');
  });
});
