describe('Render event menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should render the event menu', () => {
    cy.intercept({ method: 'POST', url: '**/api/graphql' }).as('getConcerts');
    cy.contains('Түр хүлээнэ үү!');
    cy.wait('@getConcerts');
  });

  it('should show the "no concerts" message when the API returns zero concerts', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { concerts: [] } },
    }).as('getConcerts');
    cy.wait('@getConcerts');
  });

  it('should show an error state when the concerts query fails', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { errors: [{ message: 'error' }] },
    }).as('getConcertsError');
    cy.wait('@getConcertsError');
  });
});
