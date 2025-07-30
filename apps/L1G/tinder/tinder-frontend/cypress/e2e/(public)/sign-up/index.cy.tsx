describe('Sign-up page - GenderSelect flow', () => {
  const interests = ['Male', 'Female', 'Both'];

  beforeEach(() => {
    cy.visit('/signup');
  });

  afterEach(() => {
    cy.log('Test finished');
  });

  interests.forEach((option, index) => {
    it(`Test ${index + 1}: Should select "${option}" and navigate to "/"`, () => {
      cy.get('[data-cy=Interest-Title]').should('be.visible').and('contain', 'Who are you interested in?');
      cy.get('[data-cy=Interest-Subtitle]').should('be.visible').and('contain', 'Pick the one that feels right for you!');

      cy.get('[data-cy=Interest-Select]').should('be.visible').click();

      cy.get('[role="option"]').contains(option).click();

      cy.get('[data-cy=Next-Button]').should('not.be.disabled').click();

      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
