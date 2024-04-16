describe('Leaving page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('1.Should display Leave Request btn', () => {
    cy.get('[data-cy="submit"]');
  });

  it('2. Should be clicked and show Leave Request modal', () => {
    cy.get('button').contains('Чөлөөний хуудас бөглөх').click();
    cy.get('div').contains('Чөлөөний хуудас бөглөх');
  });
  // it('should be clicked and close the modal', () => {
  //   cy.get('button').then(($button) => {
  //     if ($button.find('svg').length > 0) {
  //       cy.wrap($button).click();
  //     } else {
  //       cy.log('Button does not contain svg file');
  //     }
  //   });
  // });

  // it('should be disabled when inputs are empty', () => {
  //   cy.get('button').contains('дараах').click().should('be.disabled');
  // });
});
