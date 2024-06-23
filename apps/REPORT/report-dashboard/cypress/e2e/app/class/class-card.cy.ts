import ClassCard from '../../../../../report-dashboard/src/app/_class/_components/ClassCard'; // Adjust path as per your project structure

describe('ClassCard Component', () => {
  const mockData = {
    name: 'Test Class',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    teachers: ['Teacher 1', 'Teacher 2'],
    classType: 'Coding', // Assuming this matches the structure of your ClassCard component
    __typename: 'Class',
  };

  beforeEach(() => {
    // Increase command timeout globally for all tests
    Cypress.config('defaultCommandTimeout', 15000); // 15 seconds
    cy.visit('http://localhost:4200/'); // Ensure your application page is loaded where ClassCard is rendered
  });

  it('displays class information correctly', () => {
    cy.get('[data-testid="class-card"]').each(($card, index) => {
      cy.wrap($card).within(() => {
        cy.contains(mockData.name).should('be.visible');
        cy.contains(`${mockData.startDate} - ${mockData.endDate}`).should('be.visible');
        cy.contains(mockData.teachers[0]).should('be.visible');
        cy.contains(mockData.teachers[1]).should('be.visible');
      });
    });
  });

  it('renders correct number of teacher tags', () => {
    cy.get('[data-testid="class-card"]').each(($card, index) => {
      cy.wrap($card).find('div').eq(1).children().should('have.length', 2);
    });
  });

  it('renders DropDownMenuButton', () => {
    cy.get('[data-testid="class-card"]').each(($card, index) => {
      cy.wrap($card).find('DropDownMenuButton').should('exist');
    });
  });

  // Add more tests as needed...
});
