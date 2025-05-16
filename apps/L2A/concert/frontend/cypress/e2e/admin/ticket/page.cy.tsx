import { mockConcerts } from '../utils/mock-concert-data';
describe('Add Ticket Dialog', () => {
  beforeEach(() => {
    cy.visit('/admin/ticket');
    cy.contains('Концерт нэмэх').click();
  });

  it('should fill out and submit the Add Ticket form', () => {
    cy.intercept('POST', '**/api/graphql').as('waitapi');
    cy.get('[data-testid="concert-title"]').type(mockConcerts.title[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="concert-description"]').type(mockConcerts.description[Math.floor(Math.random() * 9)]);
    cy.get('[data-testid="artist-name"]').type(mockConcerts.artistName[Math.floor(Math.random() * 9)]);
    cy.get('[data-testid="thumbnail-url"]').type(mockConcerts.thumbnailUrl[Math.floor(Math.random() * 12)]);
    cy.get('[data-testid="venue-name"]').type('МҮЭСТО');
    cy.get('[data-testid="venue-capacity"]').type('200');
    cy.get('[data-testid="venue-address"]').type('Улаанбаатар, Энхтайвны өргөн чөлөө');
    cy.get('[data-testid="venue-city"]').type('Улаанбаатар');
    cy.get('[data-testid="start-date"]').type('2025-06-12');
    cy.get('[data-testid="end-date"]').type('2025-06-16');
    cy.get('[data-testid="music-start"]').type('18:30');
    cy.get('[data-testid="back-seat-count"]').clear().type('100');
    cy.get('[data-testid="vip-seat-count"]').clear().type('50');
    cy.get('[data-testid="standard-seat-count"]').clear().type('150');
    cy.get('[data-testid="back-seat-price"]')
      .clear()
      .type(mockConcerts.BACKSEAT[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="vip-seat-price"]')
      .clear()
      .type(mockConcerts.VIP_PRICE[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="standard-seat-price"]')
      .clear()
      .type(mockConcerts.standard[Math.floor(Math.random() * 5)]);
    cy.contains('Нэмэх').click();
    cy.wait('@waitapi');
    cy.contains('Амжилттай нэмлээ!').should('be.visible');
  });

  it('should fill out and submit the Add Ticket form successfully but should not trigger if statement', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: {
          createVenue: null,
        },
      },
    }).as('mockCreateVenue');
    cy.get('[data-testid="concert-title"]').type(mockConcerts.title[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="concert-description"]').type(mockConcerts.description[Math.floor(Math.random() * 9)]);
    cy.get('[data-testid="artist-name"]').type(mockConcerts.artistName[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="thumbnail-url"]').type(mockConcerts.thumbnailUrl[Math.floor(Math.random() * 12)]);
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
    cy.get('[data-testid="back-seat-price"]')
      .clear()
      .type(mockConcerts.BACKSEAT[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="vip-seat-price"]')
      .clear()
      .type(mockConcerts.VIP_PRICE[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="standard-seat-price"]')
      .clear()
      .type(mockConcerts.standard[Math.floor(Math.random() * 5)]);

    cy.contains('Нэмэх').click();
    cy.wait('@mockCreateVenue');
  });
  it('should throw an error on first mutation', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        error: [{ message: 'fail' }],
      },
    }).as('graphqlIntercept');
    cy.get('[data-testid="concert-title"]').type(mockConcerts.title[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="concert-description"]').type(mockConcerts.description[Math.floor(Math.random() * 9)]);
    cy.get('[data-testid="artist-name"]').type(mockConcerts.artistName[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="thumbnail-url"]').type(mockConcerts.thumbnailUrl[Math.floor(Math.random() * 12)]);
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
    cy.get('[data-testid="back-seat-price"]')
      .clear()
      .type(mockConcerts.BACKSEAT[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="vip-seat-price"]')
      .clear()
      .type(mockConcerts.VIP_PRICE[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="standard-seat-price"]')
      .clear()
      .type(mockConcerts.standard[Math.floor(Math.random() * 5)]);
    cy.contains('Нэмэх').click();
    cy.wait('@graphqlIntercept');
  });

  it('should throw an error on second mutation', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      const operationName = req.body.operationName;
      if (operationName === 'CreateVenue') {
        req.reply({
          data: {
            createVenue: {
              id: 'venue-123',
            },
          },
        });
      }

      if (operationName === 'CreateConcert') {
        req.reply({
          errors: [{ message: 'Failed to create concert' }],
        });
      }
    }).as('graphqlIntercept');
    cy.get('[data-testid="concert-title"]').type(mockConcerts.title[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="concert-description"]').type(mockConcerts.description[Math.floor(Math.random() * 9)]);
    cy.get('[data-testid="artist-name"]').type(mockConcerts.artistName[Math.floor(Math.random() * 10)]);
    cy.get('[data-testid="thumbnail-url"]').type(mockConcerts.thumbnailUrl[Math.floor(Math.random() * 12)]);
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
    cy.get('[data-testid="back-seat-price"]')
      .clear()
      .type(mockConcerts.BACKSEAT[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="vip-seat-price"]')
      .clear()
      .type(mockConcerts.VIP_PRICE[Math.floor(Math.random() * 5)]);
    cy.get('[data-testid="standard-seat-price"]')
      .clear()
      .type(mockConcerts.standard[Math.floor(Math.random() * 5)]);

    cy.contains('Нэмэх').click();
    cy.wait('@graphqlIntercept');
    cy.contains('Концерт нэмэхэд асуудал гарлаа!').should('be.visible');
  });
});
