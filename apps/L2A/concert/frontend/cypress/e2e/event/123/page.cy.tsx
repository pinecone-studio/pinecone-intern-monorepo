describe('Concert Page (real data) E2E', () => {
  const CONCERT_ID = '6824b74c8db390ee25b237e9';

  beforeEach(() => {
    cy.visit(`/event/${CONCERT_ID}`);
  });

  it('renders the banner with the correct title', () => {
    cy.get('[data-testid="concert-banner"]').should('be.visible').and('contain', 'МОНГОЛЫН ГАЙХАМШИГТ УРЛАГИЙН ТОГЛОЛТ');
  });

  it('displays the seat selector and ticket options', () => {
    cy.get('[data-testid="seat-info"]')
      .should('be.visible')
      .within(() => {
        cy.contains('Тоглолт үзэх өдрөө сонгоно уу.').should('exist');
        cy.contains('тасалбар').should('have.length.gte', 1);
        cy.get('button').contains('Тасалбар захиалах').should('not.be.disabled');
      });
  });

  it('should find no concerts', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: {
          concerts: null,
        },
      },
    }).as('noconcert');
    cy.wait('@noconcert');
    cy.contains('No concert found').should('be.visible');
  });

  it('should throw an error', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        errors: [{ message: 'fail' }],
      },
    }).as('error');
    cy.wait('@error');
    cy.contains('Error').should('be.visible');
  });
});
