describe('Create Account - First Step (Gender)', () => {
  beforeEach(() => {
    cy.visit('/auth/create-account');
  });

  it('1. Should render error when gender is not selected', () => {
    cy.contains('Next').click();
    cy.contains('Please select an option before continuing.').should('exist');
  });

  it('2. Should go to second step after gender selection', () => {
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();
    cy.contains('How old are you').should('exist');
  });
});

describe('Create Account - Second Step (Date of Birth)', () => {
  beforeEach(() => {
    cy.visit('/auth/create-account');

    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();
  });

  it('3. Should render error when date is not selected', () => {
    cy.contains('Next').click();
    cy.contains('Please select your date of birth.').should('exist');
  });

  it('4. Should proceed after selecting date', () => {
    cy.contains('Pick a date').click();

    cy.wait(500);

    cy.get('button[name="day"]').eq(1).click();

    cy.contains('Next').click();
  });
});
