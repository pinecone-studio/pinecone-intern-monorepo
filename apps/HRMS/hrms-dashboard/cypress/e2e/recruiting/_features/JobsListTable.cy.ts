describe('Jobs table', () => {
  beforeEach(() => {
    cy.visit('/recruiting');
  });

  it('renders table headers correctly', () => {
    cy.get('[data-cy="jobsList"] th').should('be.visible');
    cy.get('[data-cy="tableHeader-0"]').should('be.visible').should('have.text', 'Ажлын байр');
    cy.get('[data-cy="tableHeader-1"]').should('be.visible').should('have.text', 'Хүлээн авах эцсийн хугацаа');
    cy.get('[data-cy="tableHeader-2"]').should('be.visible').should('have.text', 'Огноо');
    cy.get('[data-cy="tableHeader-3"]').should('be.visible').should('have.text', 'Төлөв');
  });
  it('Send req to graphql endpoint', () => {
    cy.get('[data-cy="jobData"]').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').should('be.visible').should('exist');
        cy.get('td').should('be.visible').should('exist');
        cy.get('td').should('be.visible').should('exist');
        cy.get('td').should('be.visible').should('exist');
      });
    });
  });
});
