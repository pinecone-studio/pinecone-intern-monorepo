describe('My Requests Page', () => {
  it('should render the RequestStory component with correct dates', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('my-requests');
    cy.get('[data-cy=my-requests-page]').should('be.visible');
    cy.get('[data-cy=request-story]').should('be.visible');
    cy.contains('Зайнаас ажиллах').should('be.visible');
    cy.contains('Чөлөө').should('be.visible');
    const todayDay = new Date().getDate();
    cy.get('[data-cy=date-picker]').click();
    cy.get('[data-cy=calendar-content]').contains(todayDay).click();
    cy.get('[data-cy=request-story]').contains(todayDay).should('exist');
  });
  it('should redirect to login page if token is missing', () => {
    cy.window().then((window) => {
      window.localStorage.removeItem('token');
    });

    cy.visit('/my-requests');
    cy.url().should('include', '/login');
  });
  it('should find and click the button with selected=true, value=12, and name="day"', () => {
    const token = '677b83734fba809002930cc5';
    cy.window().then((window) => {
      window.localStorage.setItem('token', JSON.stringify(token));
    });
    cy.visit('/my-requests');
    cy.get('[data-cy=date-picker]').click();
    cy.get('button[aria-selected="true"]:first').should('be.visible').click();
    cy.get('body').type('{esc}');
  });
});
