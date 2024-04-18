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
      cy.contains('p', 'Зар нэмэх').should('exist');
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
  });
});
