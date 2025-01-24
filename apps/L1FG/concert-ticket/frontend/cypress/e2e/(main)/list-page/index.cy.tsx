describe('ListPage Component', () => {
  beforeEach(() => {
    // Visit the ListPage route (adjust URL according to your routing setup)
    cy.visit('/list-page'); // Assuming the page is at this URL
  });

  it('should render the HeaderPart component', () => {
    cy.get('header').should('exist'); // Check if the header is rendered
    cy.get('header').contains('ticket booking'); // Check if the text/logo appears in the header
  });

  it('should render the Page component', () => {
    cy.get('main').should('exist'); // Assuming the Page component renders inside <main>
    cy.get('main').contains('Search'); // Replace 'Search' with relevant content from your Page component
  });

  it('should render the Footerr component', () => {
    cy.get('footer').should('exist'); // Check if the footer is rendered
    cy.get('footer').contains('Footer content'); // Replace with actual footer text
  });

  it('should navigate to the correct page when a navigation link is clicked', () => {
    cy.get('a[href="/sign-up"]').click(); // Replace with actual link in the HeaderPart
    cy.url().should('include', '/sign-up'); // Assert that the URL has changed
  });
});
