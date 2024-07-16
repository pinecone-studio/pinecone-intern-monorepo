describe('RoleTableFeature Component', () => {
  beforeEach(() => {
    // Visit the route where the RoleTableFeature component is rendered
    cy.visit('/role-table-feature'); // Adjust the route as necessary
  });

  it('should render the RoleTableFeature component', () => {
    cy.get('.container').should('exist');
  });

  it('should render the header with the correct text', () => {
    cy.get('.header').should('exist');
    cy.contains('Admin role update').should('exist');
  });

  it('should render the LoginRoleSearch component', () => {
    cy.get('input[placeholder="Search"]').should('exist');
  });

  it('should render the RoleTable component with correct headers', () => {
    cy.contains('Name').should('exist');
    cy.contains('Id').should('exist');
    cy.contains('Roles').should('exist');
    cy.contains('Email').should('exist');
  });
});
