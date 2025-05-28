describe('Profile Form', () => {
  beforeEach(() => {
    cy.visit('/edit-profile/profile');
  });

  it('renders form with initial values', () => {
    cy.get('input[name="email"]').should('have.value', 'test@email.com');
    cy.contains('21 Aug 1990');
  });

  it('can change name and email', () => {
    cy.get('input[name="name"]').clear().type('Tony Stark');
    cy.get('input[name="email"]').clear().type('ironman@starkindustries.com');
  });

  it('can change bio', () => {
    cy.get('textarea[name="bio"]').clear().type('Genius, billionaire, playboy, philanthropist.');
  });

  it('can change gender preference', () => {
    cy.get('select#gender').select('Everyone');
  });

  it('can select a new date from calendar', () => {
    cy.get('button[name="day"]').click();
    cy.get('button[name="day"').contains('15').click();
  });
  it('can not select a new date from calendar', () => {
    cy.get('button[name="day"]').click();
    cy.get('button[name="day"').contains('15').click({ force: true }).contains('15').click({ force: true });
  });
  it('can change profession and school/work', () => {
    cy.get('input#profession').clear().type('Inventor');
    cy.get('input#school').clear().type('Stark Industries');
  });
  it('can remove interests', () => {
    cy.contains('Art').click();
    cy.contains('Music').click();
    cy.contains('Technology').click();
  });
it('should not allow selecting more than 10 interests', () => {
    const firstTen = [
      'Fashion',
      'Travel',
      'Food',
    ];
    firstTen.forEach((interest) => {
      cy.contains('button', interest).click();
    });
    cy.get('button.bg-gray-900').should('have.length', 10);
    cy.contains('button', 'Gaming').should('be.disabled');
    cy.contains('button', 'Sports').should('not.have.class', 'bg-gray-900');
    cy.get('button.bg-gray-900').should('have.length', 10);
  });

  it(' limit reached → do nothing', () => {
    cy.contains('Science').click();
    cy.contains('History').click();
  });
  it('submits the form', () => {
    cy.contains('Update profile').click();
  });
});
