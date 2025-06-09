describe('Search Results Page', () => {
  beforeEach(() => {
    const mockHotels = {
      data: {
        hotels: [
          {
            _id: '1',
            name: 'Grand Hotel',
            rating: 9.2,
            starRating: 5,
            images: ['https://example.com/grand.jpg'],
            amenities: ['free-wifi', 'Pool', 'free-parking'],
          },
          {
            _id: '2',
            name: 'Budget Inn',
            rating: 7.8,
            starRating: 3,
            images: ['https://example.com/budget.jpg'],
            amenities: ['free-parking'],
          },
          {
            _id: '3',
            name: 'Central Stay',
            rating: 8.5,
            starRating: 4,
            images: ['https://example.com/central.jpg'],
            amenities: ['free-wifi'],
          },
        ],
      },
    };

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotels') {
        req.reply(mockHotels);
      }
    }).as('getHotels');

    cy.visit('/search-result');
    cy.wait('@getHotels');
  });

  it('should display hotel rating and rating label if rating exists', () => {
    cy.get('[data-testid="searchcard-component"]')
      .first()
      .within(() => {
        cy.get('[data-testid="hotel-rating"]').should('contain', '9.2');
        cy.get('[data-testid="hotel-rating-label"]').should('contain', 'Excellent');
      });
  });

  it('should filter by stars', () => {
    cy.get('#stars-3').click();
    cy.get('[data-testid="searchcard-component"]').should('have.length', 1);
    cy.contains('Budget Inn');
  });

  it('should filter by amenities', () => {
    cy.get('#free-parking').click();
    cy.get('[data-testid="searchcard-component"]').should('have.length', 2);
    cy.contains('Budget Inn');
    cy.contains('Grand Hotel');
  });

  it('should filter by search input', () => {
    cy.get('input[placeholder="Search"]').type('Central');
    cy.get('[data-testid="searchcard-component"]').should('have.length', 1);
    cy.contains('Central Stay');
  });

  it('should apply multiple filters together', () => {
    cy.get('#rating-8').click();
    cy.get('#stars-4').click();
    cy.get('#free-wifi').click();
    cy.get('input[placeholder="Search"]').type('Central');
    cy.get('[data-testid="searchcard-component"]').should('have.length', 1);
    cy.contains('Central Stay');
  });

  it('should show no results for conflicting filters', () => {
    cy.get('#rating-9').click();
    cy.get('#stars-1').click();
    cy.get('[data-testid="searchcard-component"]').should('have.length', 0);
    cy.contains('0 properties');
  });

  it('should navigate to hotel detail page on card click', () => {
    cy.get('[data-testid="searchcard-component"]').first().click();
    cy.url().should('include', '/hotel-detail/1');
  });

  it('adds and removes star filter to trigger splice branch', () => {
    cy.get('#stars-4').click();

    cy.get('[data-testid="searchcard-component"]').should('exist');

    cy.get('#stars-4').click();

    cy.get('[data-testid="searchcard-component"]').should('exist');
  });
});
