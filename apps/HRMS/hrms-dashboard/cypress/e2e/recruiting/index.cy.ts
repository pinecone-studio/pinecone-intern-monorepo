describe('Recruiting Page', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('should display welcome message', () => {
    cy.get('h1').contains('hello from Recruiting Service Query');
  });

  describe('JobDash Component', () => {
    beforeEach(() => {
      cy.get('h1').contains('hello from Recruiting Service Query');
    });

    it('displays the header and button', () => {
      cy.contains('h1', 'Ажлын зар').should('exist');
      cy.get('[data-testid="open-button"]').click();
    });

    it('shows information about job advertisement', () => {
      cy.contains('p', 'Зар').should('exist');
      cy.contains('p', 'Ирсэн өргөдөл').should('exist');
    });

    it('displays job listings', () => {
      cy.contains('h1', 'Staff Software Engineer, Machine Learning, Core').should('exist');
      cy.contains('p', 'Байршил: Гурван гол оффис центр').should('exist');
    });

    it('displays detailed information when "Дэлгэрэнгүй" button is clicked', () => {
      cy.contains('p', 'Дэлгэрэнгүй').first().click();
    });

    describe('CreateErrorModal Component', () => {
      it('should open dialog when button is clicked', () => {
        cy.get('[data-testid="error-modal-button"]').click();
        cy.get('[data-testid="error-modal"]').should('be.visible');
      });

      it('should close dialog when close button is clicked', () => {
        cy.get('[data-testid="error-modal-button"]').click();
        cy.get('[data-testid="error-modal"]').should('be.visible');
        cy.get('[data-testid="close-button"]').click();
        cy.get('[data-testid="error-modal"]').should('not.exist');
      });
    });
  });
});
