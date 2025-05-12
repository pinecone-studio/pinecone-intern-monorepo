describe('Add Ticket Dialog', () => {
  beforeEach(() => {
    cy.visit('/admin/ticket');
    cy.contains('Концерт нэмэх').click();
  });

  it('should fill out and submit the Add Ticket form', () => {
    cy.get('[data-testid="concert-title"]').type('Монголын Гайхамшигт Урлагийн тоглолт');
    cy.get('[data-testid="concert-description"]').type('Ардын урлагийн "Хуур Магнай" чуулга...');
    cy.get('[data-testid="artist-name"]').type('Жавхлан');
    cy.get('[data-testid="thumbnail-url"]').type('https://example.com/image.jpg');

    cy.get('[data-testid="venue-name"]').type('МҮЭСТО');
    cy.get('[data-testid="venue-capacity"]').type('200');
    cy.get('[data-testid="venue-address"]').type('Улаанбаатар, Энхтайвны өргөн чөлөө');
    cy.get('[data-testid="venue-city"]').type('Улаанбаатар');

    cy.get('[data-testid="start-date"]').type('2025-06-01');
    cy.get('[data-testid="end-date"]').type('2025-06-02');
    cy.get('[data-testid="music-start"]').type('18:30');

    cy.get('[data-testid="back-seat-count"]').clear().type('100');
    cy.get('[data-testid="vip-seat-count"]').clear().type('50');
    cy.get('[data-testid="standard-seat-count"]').clear().type('150');

    cy.get('[data-testid="back-seat-price"]').clear().type('20000');
    cy.get('[data-testid="vip-seat-price"]').clear().type('50000');
    cy.get('[data-testid="standard-seat-price"]').clear().type('30000');

    cy.contains('Click here').click();
  });
});
