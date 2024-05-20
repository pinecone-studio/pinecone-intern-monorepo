describe('update dependant', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Should visit to update page', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(2).click();
    cy.url().should('include', 'update');
    cy.get('[data-cy="updateDependent"]').should('exist').should('be.visible');
  });

  it('update button click', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-cy="cancel-button"]').should('exist').click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-cy="dependent-update-button"]').should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('B');
    cy.get('[data-testid="customInput"]').eq(1).should('exist').type('D');
    cy.get('[data-testid="customInput"]').eq(2).should('exist').type('8');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('f');
    cy.get('[data-cy="submit-button"]').should('exist').click();
    cy.get('[data-testid="back-button"]').should('exist').click();
  });

  it('create button click', () => {
    cy.get('[data-cy="addEmployeeBtn"]').should('exist').should('be.visible').click();
    cy.get('input[name="lastName"]').type('test last name');
    cy.get('input[name="firstName"]').type('test first name');
    cy.get('input[name="email"]').type('testEmail@email.com');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').click();
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('Developer');
    cy.get('[data-testid="customInput"]').eq(3).should('not.contain', 'Албан тушаал оруулна уу');
    cy.get('[data-testid="customInput"]').eq(4).should('exist').type('2');
    cy.get('[data-testid="customInput"]').eq(4).should('not.contain', 'Түвшин оруулна уу');
    cy.get('[data-testid="customInput"]').eq(5).should('exist').type('455000');
    cy.get('[data-testid="customInput"]').eq(5).should('not.contain', 'Цалин 100 мянгаас их байх');
    cy.get('select[name="department"]').should('exist').select('DESIGN');
    cy.get('select[name="department"]').should('have.value', 'DESIGN');
    cy.get('select[name="employmentStatus"]').should('exist').select('FULL_TIME');
    cy.get('select[name="employmentStatus"]').should('have.value', 'FULL_TIME');
    cy.get('[data-cy="createEmployeeBtn"]').should('not.be.disabled');
    cy.get('button[name="submitBtn"]').click();
    cy.get('ul li').find('a').eq(2).click();
    cy.get('.paginate').last().click();
    cy.get('[data-cy="updateLink"]').should('exist').eq(-1).click();
    cy.get('[data-testid="add-information"]').should('exist').click();
    cy.get('[data-cy="cancel-button"]').click();
    cy.get('[data-testid="add-information"]').should('exist').click();
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid=add-information]').should('be.visible').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('Batbold');
    cy.get('[data-testid="customInput"]').eq(1).should('exist').type('Dorj');
    cy.get('[data-testid="customInput"]').eq(2).should('exist').type('90909090');
    cy.get('[data-testid="customInput"]').eq(3).should('exist').type('father');
    cy.get('[data-cy="submit-button"]').should('exist').click();
    cy.intercept({ method: 'POST' }).as('createDependent');
    cy.wait('@createDependent', { timeout: 1000 });
  });
});
