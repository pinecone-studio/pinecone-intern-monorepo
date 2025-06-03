describe('AdminTableList E2E - Console Logging Only', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetAllTables') {
        req.reply({
          data: {
            getAllTables: [
              {
                _id: '1',
                name: 'Table A',
                qrCodeUrl: 'https://example.com/qr1',
                createdAt: '2023-01-01T00:00:00.000Z',
              },
              {
                _id: '2',
                name: 'Table B',
                qrCodeUrl: 'https://example.com/qr2',
                createdAt: '2023-01-02T00:00:00.000Z',
              },
            ],
          },
        });
      }
    }).as('getAllTables');

    cy.visit('/admin/table');
  });

  it('renders loading then shows the table list', () => {
    cy.contains('Loading...').should('exist');
    cy.wait('@getAllTables');
    cy.get('[data-testid="classroom-row-1"]').should('exist');
    cy.get('[data-testid="classroom-row-2"]').should('exist');
  });

  it('displays correct table names', () => {
    cy.wait('@getAllTables');
    cy.get('[data-testid="classroom-name-1"]').should('contain', 'Table A');
    cy.get('[data-testid="classroom-name-2"]').should('contain', 'Table B');
  });



  it('clicks QR button (placeholder test)', () => {
    cy.wait('@getAllTables');
    cy.get('[data-testid="classroom-1-qr-button"]').click();
  });

  it('clicks delete button (placeholder test)', () => {
    cy.wait('@getAllTables');
    cy.get('[data-testid="classroom-1-delete-button"]').click();
    cy.get('[data-testid="classroom-row-1"]').should('exist');
  });
});
