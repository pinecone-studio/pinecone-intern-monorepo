describe('Create Account - feature', () => {
  beforeEach(() => {
    cy.visit('/auth/create-account');
  });

  it('1. Should render error when gender is not selected', () => {
    cy.contains('Next').click();
    cy.contains('Please select an option before continuing.').should('exist');
  });
  it('2. Should go to second step after gender selection', () => {
    // Step 1: Gender
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();

    // Step 2: DOB
    cy.contains('How old are you').should('exist');
    cy.contains('Next').click();
    cy.contains('Please select your date of birth.').should('exist');
    cy.contains('Pick a date').click();
    cy.wait(500);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();

    // Step 3: User Details
    cy.contains('Next').click();
    cy.get('input[name="name"]').type('123');
    cy.get('input[name="bio"]').type('123.');
    cy.get('input[name="interest"]').type('123');
    cy.get('input[name="profession"]').type('123');
    cy.get('input[name="schoolWork"]').type('123');
    cy.contains('Next').click();

    // Step 4: Image Upload
    cy.contains('Next').click();
    cy.contains('Please select a photo to upload.').should('exist');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });
    cy.contains('Next').click();
    cy.contains('Please select a photo to upload.').should('not.exist');
});
});g