describe('SwipeFeature component test', () => {
  beforeEach(() => {
    cy.visit('/swipe-page');
  });

  it('Displays the initial profile with image, name, and bio', () => {
    cy.get('img[alt="Profile"]').should('be.visible');
    cy.get('p.text-lg').should('exist').and('not.be.empty');
    cy.get('p.text-sm').should('exist');
  });

  it('Swipes right (Like) and moves to the next profile', () => {
    cy.get('img[alt="Profile"]')
      .invoke('attr', 'src')
      .then((firstSrc) => {
        cy.get('button[aria-label="Like"]').should('be.visible').click();
        cy.contains('LIKE').should('be.visible');
        cy.contains('LIKE').should('not.exist');
        cy.get('img[alt="Profile"]').invoke('attr', 'src').should('not.eq', firstSrc);
      });
  });

  it('Swipes left (Dislike) and moves to the next profile', () => {
    cy.get('img[alt="Profile"]')
      .invoke('attr', 'src')
      .then((firstSrc) => {
        cy.get('button[aria-label="Dislike"]').should('be.visible').click();
        cy.contains('NOPE').should('be.visible');
        cy.contains('NOPE').should('not.exist');
        cy.get('img[alt="Profile"]').invoke('attr', 'src').should('not.eq', firstSrc);
      });
  });

  it('Navigates between profile images using arrows', () => {
    // cy.get('img[alt="Profile"]')
    // .invoke('attr', 'src')
    // .then((originalSrc) => {
    cy.get('[data-testid="chevron-right"]').should('exist').click();
    cy.get('[data-testid="chevron-right"]').should('exist').click();
    cy.wait(200);
    cy.get('[data-testid="chevron-left"]').should('exist').click();
    cy.get('[data-testid="chevron-left"]').should('exist').click();
    // cy.get('img[alt="Profile"]').invoke('attr', 'src').should('eq', originalSrc);
    // });
  });
  it('Displays "No more profiles" after swiping all profiles', () => {
    cy.get('button[aria-label="Like"]').should('exist');

    function swipeUntilEnd() {
      cy.get('body').then(($body) => {
        if ($body.find('button[aria-label="Like"]').length > 0) {
          cy.get('button[aria-label="Like"]').click();

          cy.contains('LIKE').should('be.visible');
          cy.contains('LIKE').should('not.exist');

          cy.wait(500);

          swipeUntilEnd();
        } else {
          cy.contains('🎉 No more profiles').should('be.visible');
        }
      });
    }

    swipeUntilEnd();
  });
});
