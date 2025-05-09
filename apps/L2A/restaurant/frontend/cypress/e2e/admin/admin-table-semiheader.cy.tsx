describe('TableSemiHeader Test', () => {
  beforeEach(() => {
    cy.visit('/admin/table');
  });
  it('renders the header and add table button', () => {
    cy.get('[data-testid="header-title"]').should('contain', 'Ширээ');
    cy.get('[data-testid="add-table-button"]').should('be.visible');
  });
  it('opens and closes the dialog via Escape key', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="dialog-title"]').should('contain', 'Ширээ нэмэх');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="dialog-root"]').should('not.exist');
  });
  it('resets the form when dialog closes and reopens', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Temporary Table');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').should('have.value', '');
    cy.get('[data-testid="qr-wrapper"]').should('not.exist');
  });
  it('shows error toast when trying to create with empty name', () => {
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="create-button"]').click();
    cy.contains('Ширээний нэр хоосон байна').should('exist');
  });
  it('creates a table successfully and displays QR code', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddTable') {
        req.reply({
          data: {
            addTable: { _id: 'dummy-id-123' },
          },
        });
      }
    }).as('addTable');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Test Table');
    cy.get('[data-testid="create-button"]').click();
    cy.wait('@addTable');
    cy.contains('Ширээ амжилттай нэмэгдлээ!').should('exist');
    cy.get('[data-testid="qr-wrapper"]')
      .as('qrSection')
      .within(() => {
        cy.get('[data-testid="qr-instruction"]').should('contain', 'Ширээний QR код:');
        cy.get('[data-testid="qr-image"]').should('be.visible');
        cy.get('[data-testid="qr-download-button"]').should('contain', 'Татах');
        cy.get('[data-testid="qr-download-link"]').should('have.attr', 'href').and('include', 'data:image/png;base64');
        cy.get('[data-testid="qr-download-link"]').should('have.attr', 'download', 'Test Table-qr.png');
      });
  });
  it('handles GraphQL error and shows error toast', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddTable') {
        req.reply({
          statusCode: 500,
          body: {
            errors: [{ message: 'Something went wrong' }],
          },
        });
      }
    }).as('addTableError');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Error Table');
    cy.get('[data-testid="create-button"]').click();
    cy.wait('@addTableError');
    cy.contains('Серверийн алдаа. Дахин оролдоно уу.').should('exist');
  });
  it('shows error toast if QR code generation fails', () => {
    cy.window().then((win) => {
      const typedWin = win as unknown as Window & {
        QRCode: {
          toDataURL: (_text: string) => Promise<string>;
        };
      };
      return cy.stub(typedWin.QRCode, 'toDataURL').as('qrStub').rejects(new Error('Failed to generate QR'));
    });
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddTable') {
        req.reply({
          data: {
            addTable: { _id: 'dummy-id-qr-error' },
          },
        });
      }
    }).as('addTable');
    cy.get('[data-testid="add-table-button"]').click();
    cy.get('[data-testid="table-name-input"]').type('Table With QR Error');
    cy.get('[data-testid="create-button"]').click();
    cy.wait('@addTable');
    cy.contains('QR код үүсгэхэд алдаа гарлаа.').should('exist');
    cy.get('@qrStub').should('have.been.called');
  });
});
