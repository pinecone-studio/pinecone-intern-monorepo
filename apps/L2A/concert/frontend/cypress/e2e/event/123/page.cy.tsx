describe('Concert Page (real data) E2E', () => {
  const CONCERT_ID = '6822df60925fe87d0acc9744';

  beforeEach(() => {
    cy.visit(`/event/${CONCERT_ID}`);
  });

  it('renders the banner with the correct title', () => {
    cy.get('[data-testid="concert-banner"]').should('be.visible').and('contain', 'МОНГОЛЫН ГАЙХАМШИГТ УРЛАГИЙН ТОГЛОЛТ');
  });

  it('shows date & time, venue and artist in AboutEvent', () => {
    cy.get('[data-testid="about-event"]')
      .should('be.visible')
      .within(() => {
        cy.contains('2025-06-02').should('exist');
        cy.contains('11:00').should('exist');
        cy.contains('МҮЭСТО').should('exist');
        cy.contains('Жавхлан').should('exist');
      });
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
});
