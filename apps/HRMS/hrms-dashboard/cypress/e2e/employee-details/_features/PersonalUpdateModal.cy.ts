describe('update personal info', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('Click modal close icon', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('[data-testid="modal-close-icon"]').click();
  });
  it('2.Click modal cancel btn', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('[data-testid="personal-info-cancel"]').click();
  });
  it('4. Should fill out and submit the form in PersonalUpdateModal', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
  });
  it('4. visit fields error messege', () => {
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('input[name="imageUrl"]').clear();
    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="jobTitle"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="phone"]').clear();
    cy.get('input[name="address"]').clear();
    cy.get('[data-testid="submit-btn"]').should('be.visible');
    cy.get('[data-testid="submit-btn"]').click();
    cy.contains('[data-testid="imageUrl-error"]', 'ImageUrl is required').should('be.visible');
    cy.contains('[data-testid="lastName-error"]', 'Last Name is required').should('be.visible');
    cy.contains('[data-testid="firstName-error"]', 'First Name is required').should('be.visible');
    cy.contains('[data-testid="jobTitle-error"]', 'Job Title is required').should('be.visible');
    cy.contains('[data-testid="email-error"]', 'Email is required').should('be.visible');
    cy.contains('[data-testid="phone-error"]', 'Phone is required').should('be.visible');
    cy.contains('[data-testid="address-error"]', 'Address is required').should('be.visible');
  });

  it('5. Should fill out and submit the form in PersonalUpdateModal', () => {
    const imageUrl = 'https://example.com/image.jpg';
    const lastName = 'Doe';
    const firstName = 'John';
    const jobTitle = 'Software Engineer';
    const email = 'john.doe@example.com';
    const phone = '99112233';
    const address = 'Ulaanbator Mongolia';
    cy.get('[data-cy="updateLink"]').should('exist').eq(1).click();
    cy.get('[data-testid="update-button-info"]').click();
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('input[name="imageUrl"]').clear();
    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="jobTitle"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="phone"]').clear();
    cy.get('input[name="address"]').clear();
    cy.get('input[name="imageUrl"]').type(imageUrl);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="jobTitle"]').type(jobTitle);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="address"]').type(address);
    cy.get('[data-testid="submit-btn"]').should('be.visible');
    cy.get('[data-testid="submit-btn"]').click();
  });
});
