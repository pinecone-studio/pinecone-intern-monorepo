describe('Create Table Modal', () => {
  beforeEach(() => {
    cy.visit('/table');
  });

  it('shows validation error if table name is empty', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').wait(3000).click();
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(100);
    cy.get('[data-testid="Admin-Create-Table-Error-Message"]').should('be.visible').and('contain.text', 'Ширээний нэр оруулна уу');
  });

  it('shows validation error if table name is too long', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('12345678901');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(1000);
    cy.get('[data-testid="Admin-Create-Table-Error-Message"]').should('be.visible').and('contain.text', '10-c доош тэмдэгт ашиглана уу');
  });

  it('creates table successfully', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click();
    cy.contains('TEST_TEST Ширээ амжилттай үүслээ').should('be.visible');
  });

  it('shows error toast if table already exists', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click();
    cy.get('[data-cy="Admin-Table-Dialog-Close"]').click();
    cy.contains('Ширээ үүссэн байна! өөр нэр сонгоно уу').should('be.visible');
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').wait(3000).last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();
  });
});
