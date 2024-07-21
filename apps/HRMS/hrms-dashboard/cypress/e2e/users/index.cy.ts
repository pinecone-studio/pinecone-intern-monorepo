describe('UserRole Component', () => {
    it('renders UserRole component correctly', () => {
      cy.visit('/users');
  
      cy.get('[data-cy=users-page]').should('exist');
  
      cy.get('[data-testid=RoleTableContainer]').should('exist');
      cy.get('[data-testid=RoleTableHeader]').within(() => {
        cy.contains('h1', 'Admin role update').should('exist');
      });
      cy.get('[data-testid=RoleTableContent]').should('exist');
      cy.get('[data-cy="tableHead-1"]').should('be.visible').should('have.text', 'Name');
    cy.get('[data-cy="tableHead-2"]').should('be.visible').should('have.text', 'Id');
    cy.get('[data-cy="tableHead-3"]').should('be.visible').should('have.text', 'Roles');
    cy.get('[data-cy="tableHead-4"]').should('be.visible').should('have.text', 'Email');
    cy.get('[data-cy="tableBody"]').should('exist');
    });
  
    it('checks the layout of the RoleTableFeature', () => {
      cy.visit('/users');
  
      cy.get('[data-testid=RoleTableHeader]').should('exist');
      cy.get('[data-testid=RoleTableContent]').should('exist');
    });
  });