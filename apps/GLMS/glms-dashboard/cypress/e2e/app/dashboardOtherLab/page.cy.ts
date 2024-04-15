describe('dashboardOtherLab component', () => {
  beforeEach(() => {
    cy.visit('/dashboardOtherLab');
  });
  it('contains test', () => {
    cy.get('[data-testid="outerStack"]').should('exist');
    cy.get('[data-testid="outerStack"]').should('have.css', 'background-color', 'rgb(236,237,240)');
  });
  it('title test', () => {
    cy.get('[data-testid="title1"]').should('have.text', 'Сайн уу?');
    cy.get('[data-testid="title2"]').should('have.text', 'Өдрийн мэнд');
  });
  it('button test', () => {
    cy.get('[data-testid="button1"]').click();
  });
  it('tab test', () => {
    cy.get('[data-testid="tab1"]').click();
  });
});
