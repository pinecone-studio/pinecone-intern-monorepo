describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
    cy.get('input[name="email"]').type('tuuguu123123@gmail.com');
    cy.get('input[name="password"]').type('90131305');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="avatar-button"]').should('be.visible').click();
    cy.get('[data-testid="profile-link"]').click();
  });

  it('should open calendar and select a valid date', () => {
    cy.get('[data-testid="profile-calendar"]').click();

    cy.contains('1').click();
  });
  it('should populate form with currentProfile values', () => {
    cy.get('input[name="name"]').should('have.value', 'tuguldur');
    cy.get('input[name="email"]').should('have.value', 'tuuguu123123@gmail.com');

    cy.get('textarea[name="bio"]').should('have.value', 'bi bol tugu');

    cy.get('input[name="profession"]').should('have.value', 'software engineer');

    cy.get('input[name="school"]').should('have.value', 'pinecone acedamy');

    cy.get('[data-testid="profile-select"]').should('have.value', 'Female');
  });

  it('should select Male from the dropdown', () => {
    cy.get('[data-testid="profile-select"]').select('Male');
    cy.get('[data-testid="profile-select"]').should('have.value', 'Male');
  });

  it('should toggle interest off if already selected', () => {
    cy.get('[data-testid="interest-Art"]').click();
    cy.get('[data-testid="interest-Art"]').should('have.class', 'bg-gray-900'); // Сонгогдсон эсэхийг шалгах

    cy.get('[data-testid="interest-Art"]').click();
    cy.get('[data-testid="interest-Art"]').should('not.have.class', 'bg-gray-900'); // Сонголт арилсан эсэх
  });

  it('should click submit button and show success toast', () => {
    cy.wait(800);
    cy.get('[data-testid="profile-submitButton"]').click();
    cy.contains('successfully changed!', { timeout: 5000 }).should('be.visible');
  });
});
