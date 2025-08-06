describe('table create table modal', () => {
  beforeEach(() => {
    cy.visit('/table');
  });

  it('1. should render table page ', () => {
    cy.get('[data-cy=Create-Table]').should('be.visible');
  });
  it('2. should open and close table create dialog ', () => {
    cy.get('[data-cy=Admin-Table-Dialog-Trigger').click();
    cy.get('[data-cy=Admin-Table-Dialog-Container').should('be.visible');
    cy.get('[data-cy=Admin-Table-Dialog-Close-Button').click();
    cy.get('[data-cy=Create-Table]').should('be.visible');
  });
  it('3. When user does not enter table name, it should display error message', () => {
    cy.get('[data-cy=Admin-Table-Dialog-Trigger').click();
    cy.get('[data-cy=Admin-Create-Table-Button]').click();
    cy.get('[data-cy=Admin-Create-Table-Error-Message]').should('be.visible');
    cy.get('[data-cy=Admin-Create-Table-Error-Message]').should('have.text', 'Ширээний нэр оруулна уу');
  });
  it('4. When user enters more than 10 characters on table name input, it should display error message', () => {
    cy.get('[data-cy=Admin-Table-Dialog-Trigger').click();
    cy.get('[data-cy=Admin-Create-Table-Input]').type('999999999999');
    cy.get('[data-cy=Admin-Create-Table-Button]').click();
    cy.get('[data-cy=Admin-Create-Table-Error-Message]').should('be.visible');
    cy.get('[data-cy=Admin-Create-Table-Error-Message]').should('have.text', '10-c доош тэмдэгт ашиглана уу');
  });
  it('5. When user enters exist table name, shows error toast on duplicate table', () => {
    cy.get('[data-cy="Admin-Table-Dialog-Trigger"]').click();
    cy.get('[data-cy="Admin-Create-Table-Input"]').type('A1');
    cy.get('[data-cy="Admin-Create-Table-Button"]').click().should('have.text', 'Үүсгэж байна...');
    cy.get('[role="status"]').should('have.attr', 'data-type', 'error').and('contain.text', 'Ширээ үүссэн байна! өөр нэр сонгоно уу');
  });
  it('5. When user enters valid table name, it should shows success toast', () => {
    cy.get('[data-cy="Admin-Table-Dialog-Trigger"]').click();
    cy.get('[data-cy="Admin-Create-Table-Input"]').type('A1111');
    cy.get('[data-cy="Admin-Create-Table-Button"]').click().should('have.text', 'Үүсгэж байна...');
    cy.get('li[data-sonner-toast][data-type="success"]').find('div[data-title]', { timeout: 100 }).should('contain.text', 'A1111 Ширээ амжилттай үүслээ');
  });
});
