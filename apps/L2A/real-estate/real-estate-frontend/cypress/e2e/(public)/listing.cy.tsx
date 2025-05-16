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

    it('should show empty state when no results', () => {
      cy.visit('/listing?type=CASTLE&totalRooms=99');
      cy.get('[data-cy="listing-grid"]').children().should('have.length', 0);
    });

    it('should show empty state with impossible filter', () => {
      cy.visit('/listing?type=NON_EXISTENT_TYPE');
      cy.get('[data-cy="listing-grid"]').children().should('have.length', 0);
    });
  });

  describe('Sorting', () => {
    it('should have sort button', () => {
      cy.get('[data-cy="sort-button"]').should('exist');
    });

    it('should open sort options when clicked', () => {
      cy.get('[data-cy="sort-button"]').click();
      // Optional: assert sort options dropdown
    });
  });
});
