describe('AddJobPageComponent', () => {
  beforeEach(() => {
    cy.visit('/recruiting/add-job');
  });

  it('should render the component', () => {
    cy.get('[data-testid="title"]').should('be.visible');
  });

  it('should fill the form and submit', () => {
    cy.get('input[name="title"]').type('Test title');
    cy.get('textarea[name="description"]').type('Test description');
    cy.get('textarea[name="requirements"]').type('Test requirements');
    cy.get('input[name="minSalary"]').type('1000');
    cy.get('input[name="maxSalary"]').type('2000');
    cy.get('input[name="deadline"]').type('2022-12-31');
    cy.get('[data-testid="modal-button"]').click();
    // Add assertions to check the mutation result
  });

  it('should navigate back when back button is clicked', () => {
    cy.get('[data-testid="back-button"]').click();
    cy.visit('/recruiting');
  });
});
