describe('PersonalUpdateModal Component Test', () => {
  beforeEach(() => {
    cy.get('/employee-details/update/66389a107bc2c1b3a29a5585');
    cy.get('[data-testid="update-button-info"]').click();
  });

  it('displays modal with form fields and default values', () => {
    cy.get('[data-testid="personal-info-modal"]').should('be.visible');
    cy.get('input[name="imageUrl"]').should('exist').should('have.value', '');
    cy.get('input[name="lastName"]').should('exist').should('have.value', '');
    cy.get('input[name="firstName"]').should('exist').should('have.value', '');
    cy.get('input[name="jobTitle"]').should('exist').should('have.value', '');
    cy.get('input[name="email"]').should('exist').should('have.value', '');
    cy.get('input[name="phone"]').should('exist').should('have.value', '');
    cy.get('input[name="address"]').should('exist').should('have.value', '');
  });
  it('displays error messages on invalid form submission', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('ImageUrl is required').should('be.visible');
    cy.contains('Last Name is required').should('be.visible');
    cy.contains('First Name is required').should('be.visible');
    cy.contains('Job Title is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Phone is required').should('be.visible');
    cy.contains('Address is required').should('be.visible');
  });

  it('closes modal when close button is clicked', () => {
    cy.get('[data-testid="personal-info-modal"] button').click();
    cy.get('[data-testid="personal-info-modal"]').should('not.exist');
  });

  it('submits form successfully', () => {
    cy.get('input[name="imageUrl"]').type('https://example.com/image.jpg');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="jobTitle"]').type('Software Engineer');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('button[type="submit"]').click();
  });
});
