describe('SwipeFeature компонентын тест', () => {
  beforeEach(() => {
    cy.visit('/swipe-page');
  });

  it('Профайл дуудаж үзүүлж байна', () => {
    cy.get('img[alt="Profile"]').should('be.visible');
  });

  it('Зурагны өмнөх, дараах товчлуур ажиллаж байна', () => {
    cy.get('button').contains('‹').should('not.exist');

    cy.get('.absolute.right-4').click();

    cy.get('img[alt="Profile"]').should('be.visible');
  });

  it('Лайк товчлуурыг дарахад дараагийн профайл руу шилжиж байна', () => {
    cy.get('button[aria-label="Like"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Loved');
    });

    cy.wait(300);

    cy.get('p.text-lg').should('not.be.empty');
  });

  it('Дислайк товчлуурыг дарахад дараагийн профайл руу шилжиж байна', () => {
    cy.get('button[aria-label="Dislike"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('User has been deleted');
    });

    cy.wait(300);

    cy.get('p.text-lg').should('not.be.empty');
  });

  it('Бүх профайл үзэж дууссан үед "No more profiles" мессеж гарч байна', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('button[aria-label=Like]').click();
      cy.wait(250);
    }

    cy.contains('No more profiles').should('be.visible');
  });
});
