import { Class, ClassType } from '@/generated';

describe('ClassCard Component', () => {
  const mockData: Class = {
    name: 'Test Class',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    teachers: ['Teacher 1', 'Teacher 2'],
    classType: ClassType.Coding,
    // Add any other required fields here
  };

  beforeEach(() => {
    // Visit the page or load the component if it's part of a SPA
    cy.visit('http://localhost:4200/'); // Replace with your actual URL or route
  });

  it('displays class information correctly', () => {
    // Render the ClassCard component with mockData
    cy.get('[data-testid="class-card"]').as('classCard');
    cy.get('@classCard').within(() => {
      cy.contains('Test Class').should('exist');
      cy.contains('2023-01-01 - 2023-12-31').should('exist');
      cy.get('div')
        .eq(1)
        .within(() => {
          cy.contains('Teacher 1').should('exist');
          cy.contains('Teacher 2').should('exist');
        });
    });
  });

  it('handles different numbers of teachers', () => {
    const singleTeacherData = { ...mockData, teachers: ['Single Teacher'] };
    cy.get('[data-testid="class-card"]').as('classCard');

    // Render with data containing a single teacher
    cy.get('@classCard').then(() => {
      cy.contains('Test Class').should('exist');
      cy.contains('2023-01-01 - 2023-12-31').should('exist');
      cy.get('div')
        .eq(1)
        .within(() => {
          cy.contains('Single Teacher').should('exist');
        });
    });

    const manyTeachersData = {
      ...mockData,
      teachers: ['Teacher 1', 'Teacher 2', 'Teacher 3', 'Teacher 4'],
    };

    // Render with data containing multiple teachers
    cy.get('@classCard').then(() => {
      cy.contains('Test Class').should('exist');
      cy.contains('2023-01-01 - 2023-12-31').should('exist');
      cy.get('div')
        .eq(1)
        .within(() => {
          cy.get('div').should('have.length', 4);
          manyTeachersData.teachers.forEach((teacher, index) => {
            cy.get('div').eq(index).contains(teacher).should('exist');
          });
        });
    });
  });
});
