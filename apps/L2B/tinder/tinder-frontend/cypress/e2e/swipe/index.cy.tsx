describe('SwipeFeature component test', () => {
  beforeEach(() => {
    cy.visit('/swipe-page');
  });

  it('Displays a profile', () => {
    cy.get('img[alt="Profile"]').should('be.visible');
  });

  it('Navigates to the next profile when the Like button is clicked', () => {
    cy.get('button[aria-label="Like"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Loved');
    });

    cy.wait(300);

    cy.get('p.text-lg').should('not.be.empty');
  });

  it('Navigates to the next profile when the Dislike button is clicked', () => {
    cy.get('button[aria-label="Dislike"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('User has been deleted');
    });

    cy.wait(300);

    cy.get('button[aria-label="Dislike"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('User has been deleted');
    });

    cy.wait(300);
    cy.get('[data-testid="chevron-left"]').click();
    cy.get('[data-testid="chevron-right"]').click();
    cy.get('[data-testid="chevron-left"]').click();
  });

  it('Displays "No more profiles" message when all profiles have been viewed', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('button[aria-label=Like]').click();
      cy.wait(250);
    }

    cy.contains('No more profiles').should('be.visible');
  });
});
