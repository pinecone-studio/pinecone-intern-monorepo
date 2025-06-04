/* eslint-disable max-lines */
describe('Listing Page', () => {
  beforeEach(() => {
    cy.visit('/listing');
  });

  describe('Type Filters', () => {
    ['apartment', 'house', 'office'].forEach((type) => {
      it(`should toggle ${type} on and off`, () => {
        const selector = `[data-cy="type-${type}"] button[role="checkbox"]`;
        cy.get(selector).click().should('have.attr', 'data-state', 'checked');
        cy.get(selector).click().should('have.attr', 'data-state', 'unchecked');
      });
    });
  });

  describe('Room Filters', () => {
    [1, 2, 3, 4, 5].forEach((roomCount) => {
      it(`should toggle room ${roomCount} on and off`, () => {
        const selector = `[data-cy="room-${roomCount}"] button[role="checkbox"]`;
        cy.get(selector).click().should('have.attr', 'data-state', 'checked');
        cy.get(selector).click().should('have.attr', 'data-state', 'unchecked');
      });
    });
  });

  describe('Bathroom Filters', () => {
    [1, 2, 3].forEach((bathCount) => {
      it(`should toggle bath ${bathCount} on and off`, () => {
        const selector = `[data-cy="bath-${bathCount}"] button[role="checkbox"]`;
        cy.get(selector).click().should('have.attr', 'data-state', 'checked');
        cy.get(selector).click().should('have.attr', 'data-state', 'unchecked');
      });
    });
  });

  describe('Additional Options', () => {
    ['garage', 'lift', 'balcony'].forEach((option) => {
      it(`should toggle ${option} option on and off`, () => {
        const selector = `[data-cy="option-${option}"] button[role="checkbox"]`;
        cy.get(selector).click().should('have.attr', 'data-state', 'checked');
        cy.get(selector).click().should('have.attr', 'data-state', 'unchecked');
      });
    });
  });

  describe('Location Filters', () => {
    it('should have city select', () => {
      cy.get('[data-cy="select-city"]').should('exist');
    });

    it('should have district select', () => {
      cy.get('[data-cy="select-district"]').should('exist');
    });
  });

  describe('Price Filters', () => {
    it('should have min price select', () => {
      cy.get('[data-cy="price-min"]').should('exist');
    });

    it('should have max price select', () => {
      cy.get('[data-cy="price-max"]').should('exist');
    });
  });

  describe('Search Functionality', () => {
    it('should have search input', () => {
      cy.get('[data-cy="listing-search-input"]').should('exist');
    });

    it('should allow text input in search', () => {
      const testText = 'Test search';
      cy.get('[data-cy="listing-search-input"]')
        .type(testText)
        .should('have.value', testText);
    });
  });

  describe('Results Display', () => {
    it('should show listing count', () => {
      cy.get('[data-cy="listing-count"]').should('contain', 'Нийт:');
    });

    it('should show listing cards when results exist', () => {
      cy.get('[data-cy="listing-grid"]')
        .children()
        .should('have.length.greaterThan', 0);
    });
    
  it('should navigate to detailed page when a listing card is clicked', () => {
  cy.intercept('POST', '**/graphql').as('getListings'); 

  cy.visit('/listing');
  cy.wait('@getListings'); 

  cy.get('[data-cy="listing-grid"]')
    .children()
    .first()
    .click();

  cy.url().should('include', '/detailed/');
});

    it('should show empty state when no results', () => {
      // eslint-disable-next-line no-secrets/no-secrets
      cy.visit('/listing?type=CASTLE&totalRooms=99');
      cy.get('[data-cy="listing-grid"]').children().should('have.length', 0);
    });

    it('should show empty state with impossible filter', () => {
      // eslint-disable-next-line no-secrets/no-secrets
      cy.visit('/listing?type=NON_EXISTENT_TYPE');
      cy.get('[data-cy="listing-grid"]').children().should('have.length', 0);
    });

      it('should show skeletons while loading', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      // eslint-disable-next-line max-nested-callbacks
      req.on('response', (res) => {
        res.setDelay(1000); 
      });
    }).as('slowPosts');

    cy.visit('/listing');
    cy.get('[data-testid="listing-skeleton"]').should('have.length', 6);
    cy.wait('@slowPosts');
  });
  });

  describe('Sorting', () => {
    it('should have sort button', () => {
      cy.get('[data-cy="sort-button"]').should('exist');
    });

    it('should open sort options when clicked', () => {
      cy.get('[data-cy="sort-button"]').click();
    });
  });

describe('Landing to Listing Search Propagation', () => {
  it('should hydrate search input from query param and clear searchFromLanding', () => {
    const keyword = 'Зайсан';
    const encoded = encodeURIComponent(keyword);

    cy.visit(`/listing?search=${encoded}`);

    cy.get('[data-cy="listing-search-input"]', { timeout: 10000 })
      .should('exist')
      .invoke('val')
      .should('eq', keyword);
    cy.url().should('include', '/listing');
    cy.get('[data-cy="listing-grid"]').children().should('have.length', 0);
  });
});
describe('Force trigger searchFromLanding hydration', () => {
  it('should hydrate from URL and trigger useEffect', () => {
    const keyword = 'Зайсан';
    const encoded = encodeURIComponent(keyword);

    cy.visit(`/listing?search=${encoded}`);
    cy.get('[data-cy="listing-search-input"]', { timeout: 10000 })
      .should('exist')
      .should('have.value', keyword);
    cy.get('[data-cy="listing-search-input"]').focus().blur();
    cy.wait(500);
    cy.get('[data-cy="sort-button"]').click();
  });
});});
