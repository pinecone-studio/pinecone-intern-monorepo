describe('Course component', () => {
  const props = {
    image: 'https://pinecone',
    title: 'HTML',
    information: 'hi welcome to my code',
    lessonCount: 12,
  };

  beforeEach(() => {
    cy.visit('/dashboardOtherLab/_components/Course');
  });

  it('renders course container with correct styles', () => {
    cy.get('[data-testid="courseContain"]').should('exist').and('have.css', 'background-color', 'rgb(255, 255, 255)').and('have.css', 'height', '240px');
    // .and('have.css', 'borderRadius', '12px');
  });

  it('renders course image with correct source', () => {
    cy.get('[data-testid="lessonImage"]').should('exist').and('have.attr', 'src', props.image);
  });

  it('renders course title, information, and lesson count with correct text', () => {
    cy.get('[data-testid="titleTest"]').should('exist').and('have.text', props.title);
    cy.get('[data-testid="infoTest"]').should('exist').and('have.text', props.information);
    cy.get('[data-testid="lessonCountTest"]').should('exist').and('have.text', props.lessonCount.toString());
  });
});
