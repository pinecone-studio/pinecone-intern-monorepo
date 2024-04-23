describe('Requests Component', () => {
  beforeEach(() => {
    cy.visit('/leaving');
  });

  // it('1.displays loading message while fetching data', () => {
  //   cy.get('[data-cy=requests]').contains('Loading...');
  // });

  // it('2.displays error message if data fetching fails', () => {
  //   cy.reload();
  //   cy.get('[data-cy=requests]').contains('Error:');
  // });

  it('1.displays data in the table when fetched successfully', () => {
    cy.reload();
    cy.get('[data-testid=request-0]').click();
    cy.url().should('include', '/leaving/Detail?requestId=');
  });
  it('2.approve button', () => {
    cy.reload();
    cy.get('[data-testid=request-0]').click();
    cy.url().then((url) => {
      const requestId = url.split('requestId=')[1];
      cy.get('[data-testid=approve-button]').click();
      cy.url().should('include', '/leaving');
      cy.get(`[data-testid=request-${requestId}]`).should('have.text', 'Approved');
    });
  });
});
