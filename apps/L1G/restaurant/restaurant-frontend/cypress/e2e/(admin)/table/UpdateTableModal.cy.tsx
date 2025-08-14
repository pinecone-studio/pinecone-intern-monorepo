describe('Admin delete table', () => {
  beforeEach(() => {
    cy.visit('/table');
  });
  it('should display error message if user not enters table name', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Update-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Update-Table-Button"]').click();
    cy.get('[data-testid="Admin-Create-Table-Error-Message"]').should('be.visible').and('contain.text', 'Ширээний нэр оруулна уу');
    cy.get('[data-cy="Admin-Table-Dialog-Close"]').click();
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click().wait(3000);
  });
  it.only('should display error message if user enters more than 10 characters', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Update-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Update-Table-Input"]').type('12345678901');
    cy.get('[data-cy="Admin-Update-Table-Button"]').click();
    cy.get('[data-testid="Admin-Create-Table-Error-Message"]').should('be.visible').and('contain.text', '10-c доош тэмдэгт ашиглана уу');
    cy.get('[data-cy="Admin-Table-Dialog-Close"]').click();
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click().wait(3000);
  });
  it('should display error message if user enters already exist table', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Update-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Update-Table-Input"]').type('TEST_TEST');
    cy.get('[data-cy="Admin-Update-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Table-Dialog-Close"]').click();
    cy.contains('Ширээ үүссэн байна! өөр нэр сонгоно уу').should('be.visible');
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click().wait(3000);
  });
  it('should update table successfully', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Update-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Update-Table-Input"]').type('TEST');
    cy.get('[data-cy="Admin-Update-Table-Button"]').click().wait(3000);
    cy.contains('Ширээ амжилттай шинчлэгдлээ').should('be.visible');
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();
  });
});
