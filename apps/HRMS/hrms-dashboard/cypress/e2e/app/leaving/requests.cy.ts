describe('Requests Component', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  it.only('should render loading state', () => {
    cy.intercept('GET', '/api/requests', { fixture: 'loading.json' }).as('getRequests');
    cy.contains('Loading...').should('be.visible');
    cy.wait('@getRequests');
  });
  it('Displays error message correctly', () => {
    cy.visit('error');
    cy.get('p').contains('Error:').should('exist');
  });

  it('should render error state', () => {
    cy.intercept('GET', '/api/requests', { statusCode: 500 }).as('getRequests');
    cy.contains('Error:').should('be.visible');
    cy.wait('@getRequests');
  });

  it('should render data correctly', () => {
    const data = [
      { _id: '1', declinedReasoning: 'Reason 1', description: 'Description 1', totalHour: '1', status: 'Pending' },
      { _id: '2', declinedReasoning: 'Reason 2', description: 'Description 2', totalHour: '2', status: 'Approved' },
    ];
    cy.intercept('GET', '/api/requests', { body: { getRequests: data } }).as('getRequests');
    cy.wait('@getRequests');
    cy.get('table').should('exist');
    data.forEach((dat, index) => {
      cy.get(`[data-testid="request-${index}"]`).as(`request-${index}`);
      cy.get(`@request-${index}`).contains(dat._id).should('be.visible');
      cy.get(`@request-${index}`).contains(dat.declinedReasoning).should('be.visible');
      cy.get(`@request-${index}`).contains(dat.description).should('be.visible');
      cy.get(`@request-${index}`).contains(dat.totalHour).should('be.visible');
      cy.get(`@request-${index}`).contains(dat.status).should('be.visible');
    });
  });

  it('should navigate to detail page on row click', () => {
    const data = [{ _id: '1' }];
    cy.intercept('GET', '/api/requests', { body: { getRequests: data } }).as('getRequests');
    cy.wait('@getRequests');
    cy.get('[data-testid="request-0"]').click();
    cy.url().should('include', '/leaving/Detail?requestId=1');
  });
});
