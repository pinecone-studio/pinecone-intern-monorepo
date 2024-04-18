describe('RecruitingButton', () => {
  it('clicking the button should navigate to /jobrecruit', () => {
    cy.visit('/');
    cy.contains('hello test').click();
    cy.url().should('include', '/jobrecruit');
  });
});
