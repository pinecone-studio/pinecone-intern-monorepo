describe('createLessonPage', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should display the greeting message on the dashboard', () => {
    cy.get('[data-testid="title1"]').should('contain', 'Сайн уу?');
    cy.get('[data-testid="title2"]').should('contain', 'Өдрийн мэнд');
  });
  it('displays correct tabs based on user access', () => {
    cy.get('[data-testid=button1]').then(($button) => {
      if ($button.length > 0) {
        cy.get('[data-testid=tab1]').should('have.length', 6);
      } else {
        cy.get('[data-testid=tab1]').should('have.length', 2);
      }
    });
  });

  it('should allow creating a course', () => {
    cy.get('[data-testid="button1"]').click();
    cy.url().should('include', '/create-course');
  });
  it('should navigate to the create assessment page when "Төсөл" button is clicked', () => {
    cy.get('[data-testid="assessment-btn"]').should('exist').contains('Төсөл').should('be.visible');

    cy.get('[data-testid="assessment-btn"]').click();
    cy.url().should('include', '/create-assessment');
  });
  it('should switch to the correct tab and display the respective content in ActionTab', () => {
    const tabs = ['Хичээл', 'Ноорог'];

    tabs.forEach((tab) => {
      cy.get(`[data-cy="${tab}"]`).click();
      cy.get(`[data-cy="${tab}"]`).should('have.class', 'font-extrabold');
      cy.contains(tab).should('exist');
    });
  });

  it('it should return deleted card that represent deleted', () => {});

  it('should display filtered courses for the selected tab', () => {
    cy.get('[data-cy="Хичээл"]').click();
    cy.get('[data-cy="courseClick"]').should('exist');
    cy.get('[data-cy="courseClick"]').first().click();
  });

  it('should display filtered courses when tab is changed', () => {
    cy.get('[data-cy="Сорил"]').click();
    cy.get('[data-cy="courseClick"]').should('exist');
    cy.get('[data-cy="courseClick"]').first().click({ force: true });
  });

  // it('should handle publishing a draft challenge', () => {
  //   cy.get('[data-cy="Сорилийн ноорог"]').click();
  //   cy.get('[data-testid="challenge-btn"]').first().click({ force: true });
  //   cy.get('.Toastify__toast--success').should('exist');
  // });

  // it('should handle archiving an approved challenge', () => {
  //   cy.get('[data-cy="Сорил"]').click();
  //   cy.get('[data-testid="challenge-btn"]').first().click({ force: true });
  //   cy.get('.Toastify__toast--success').should('exist');
  // });
});
