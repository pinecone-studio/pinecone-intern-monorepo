describe(' update employment input', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('1. Modal should open when click on update button', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('[data-cy="updateEmploymentForm"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the update button, it should display an error messages', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist');
    cy.get('select[name="department"]').should('exist');
    cy.get('input[name="dateOfEmployment"]').should('exist');
    cy.get('select[name="employmentStatus"]').should('exist');
  });
  it('3. When the user types a job title, error message should disappear', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').type('Developer');
    cy.get('input[name="jobTitle"]').should('not.contain', 'Албан тушаал оруулна уу');
  });
  it('4. When the user select a department, it should display invalid departments list', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').type('Developer');
    cy.get('input[name="jobTitle"]').should('not.contain', 'Албан тушаал оруулна уу');
    cy.get('select[name="department"]').should('exist').select('DESIGN');
    cy.get('select[name="department"]').should('have.value', 'DESIGN');
  });
  it('5. When the user select employment date, date should display', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').click();
    cy.get('input[name="jobTitle"]').should('exist').type('Developer');
    cy.get('input[name="jobTitle"]').should('not.contain', 'Албан тушаал оруулна уу');
    cy.get('select[name="department"]').should('exist').select('DESIGN');
    cy.get('select[name="department"]').should('have.value', 'DESIGN');
    cy.get('input[name="dateOfEmployment"]').should('exist').click();
    cy.get('input[name="dateOfEmployment"]').should('exist').type('2021-05-21');
  });
  it('6. When the user select employment status, status should display', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('Developer');
    cy.get('[data-testid="customInput"]').eq(0).should('not.contain', 'Албан тушаал оруулна уу');
    cy.get('select[name="department"]').should('exist').select('DESIGN');
    cy.get('select[name="department"]').should('have.value', 'DESIGN');
    cy.get('input[name="dateOfEmployment"]').should('exist').click();
    cy.get('input[name="dateOfEmployment"]').should('exist').type('2021-05-21');
    cy.get('select[name="employmentStatus"]').should('exist').select('FULL_TIME');
    cy.get('select[name="employmentStatus"]').should('have.value', 'FULL_TIME');
  });
  it('7. When When the user fill all input, submit button is not disabled', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(0).click();
    cy.get('[data-cy="updateEmploymentInfoBtn"]').should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').click();
    cy.get('[data-testid="customInput"]').eq(0).should('exist').type('Developer');
    cy.get('[data-testid="customInput"]').eq(0).should('not.contain', 'Албан тушаал оруулна уу');
    cy.get('select[name="department"]').should('exist').select('DESIGN');
    cy.get('select[name="department"]').should('have.value', 'DESIGN');
    cy.get('input[name="dateOfEmployment"]').should('exist').click();
    cy.get('input[name="dateOfEmployment"]').should('exist').type('2021-05-21');
    cy.get('select[name="employmentStatus"]').should('exist').select('FULL_TIME');
    cy.get('select[name="employmentStatus"]').should('have.value', 'FULL_TIME');
    cy.get('[data-cy="updateEmploymentBtn"]').should('not.be.disabled');
    cy.get('button[name="updateBtn"]').click();
  });
});
