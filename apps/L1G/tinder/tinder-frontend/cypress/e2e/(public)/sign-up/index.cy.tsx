describe('Sign-up page', () => {
  const interests = ['Male', 'Female', 'Both'];

  beforeEach(() => {
    cy.visit('/signup');
  });

  afterEach(() => {
    cy.log('Test finished');
  });

  interests.forEach((option, index) => {
    it(`Test ${index + 1}: Should render correctly and navigate to "/" after selecting "${option}"`, () => {
      // Гарчиг байгаа эсэхийг шалгах
      cy.get('[data-cy=Interest-Title]').should('be.visible').and('contain', 'Who are you interested in?');

      cy.get('[Interest-Subtitle]').should('be.visible').and('contain', 'Pick the one that feels right for you!');

      // Dropdown харагдаж байгааг шалгах
      cy.get('[data-cy=Interest-Select]').should('be.visible');

      // Next товч харагдаж байгааг шалгах
      cy.get('[data-cy=Next-Button]').should('be.visible');

      // Dropdown дээр дарж option сонгох
      cy.get('[data-cy=Interest-Select]').click();
      cy.get('[role=option]').contains(option).click();

      // Next товч дарах
      cy.get('[data-cy=Next-Button]').click();

      // Redirect "/"-руу болсон эсэхийг шалгах
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
