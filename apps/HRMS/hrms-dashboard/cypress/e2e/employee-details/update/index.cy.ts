describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

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

  it('Should fill out and submit the form PersonalUpdateModal', () => {
    const lastName = 'Doe';
    const firstName = 'John';
    const jobTitle = 'Software Engineer';
    const email = 'john.doe@example.com';
    const phone = '99112233';
    const address = 'Ulaanbator Mongolia';
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('exist');
    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="jobTitle"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="phone"]').clear();
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="jobTitle"]').type(jobTitle);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="homeAddress"]').type(address);
    cy.get('[data-testid="submit-btn"]').should('be.visible');
    cy.get('[data-testid="submit-btn"]').click();
  });

  it('When When the user fill all input, submit button is not disabled', () => {
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
