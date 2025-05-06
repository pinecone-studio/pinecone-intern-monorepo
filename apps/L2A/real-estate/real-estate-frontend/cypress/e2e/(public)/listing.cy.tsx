
describe('Listing Page', () => {
    beforeEach(() => {
      cy.visit('/listing');
    });
  
    it('renders the listing page', () => {
      cy.get('[data-cy="listing-page"]').should('exist');
    });
  
    it('can check the "1 өрөө" checkbox', () => {
    
        cy.get('[data-cy="room-1"]').contains('1 өрөө').click({ force: true });
    

        cy.get('[data-cy="room-1"] [role="checkbox"]')
          .should('have.attr', 'aria-checked', 'true');
      });
  
    it('allows typing in the search input', () => {
      cy.get('[data-cy="listing-search-input"]').type('Зайсан').should('have.value', 'Зайсан');
    });
  
    it('clicks sort button', () => {
      cy.get('[data-cy="sort-button"]').click();
    });
  
    it('renders 18 listing cards', () => {
      cy.get('[data-cy="listing-grid"]').children().should('have.length', 18);
    });
  });
  