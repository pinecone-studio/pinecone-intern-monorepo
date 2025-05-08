describe('TableSemiHeader', () => {
  beforeEach(() => {
    cy.visit('/admin/table');
  });
  const clickAddTableButton = () => cy.get('[data-testid="add-table-button"]').click();
  it('renders header title', () => {
    cy.get('[data-testid="header-title"]').should('contain.text', 'Ширээ');
  });
  it('opens dialog when clicking add table button', () => {
    clickAddTableButton();
    cy.get('[data-testid="dialog-content"]').should('exist');
  });
  it('shows alert when input is empty and clicking create', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
      clickAddTableButton();
      cy.get('[data-testid="create-button"]').click();
      cy.get('@alertStub').should('have.been.calledWith', 'Ширээний нэр хоосон байна');
    });
  });
  it('shows success alert and QR code when input is filled', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
      clickAddTableButton();
      cy.get('[data-testid="table-name-input"]').type('Table 1');
      cy.get('[data-testid="create-button"]').click();
      cy.get('@alertStub').should('have.been.calledWith', 'Амжилттай ширээ нэмэгдлээ!');
      cy.get('[data-testid="qr-wrapper"]').should('exist');
      cy.get('[data-testid="qr-image"]').should('be.visible');
      cy.get('[data-testid="qr-download-button"]').should('exist');
    });
  });
});
