describe('AssessmentPage Component', () => {
  beforeEach(() => {
    cy.visit('/assessment');
  });

  it('should display the correct headings and content', () => {
    cy.get('h1').eq(0).should('contain.text', 'hello from GLMS dashboard Assessment Page');
    cy.get('h1').eq(1).should('contain.text', 'hello from Assessment Service Query');
  });

  it('should render AssessmentMain component', () => {
    cy.get('[data-testid="assessment-main"]').should('exist');
  });

  it('should navigate to the home page when the "Go back to home page" button is clicked', () => {
    cy.get('button').contains('Go back to home page').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should fetch data from Assessment Service and display it correctly', () => {
    cy.get('h1').eq(1).should('contain.text', 'hello from Assessment Service Query');
  });
  it('loads successfully', () => {
    cy.visit('/assessment'); 
    cy.contains('hello from GLMS dashboard Assessment Page').should('exist');
  });


  it('navigates to home page when "Go back to home page" button is clicked', () => {
    cy.visit('/assessment');
    cy.get('button').contains('Go back to home page').click();
    cy.url().should('include', '/');
  });
});
