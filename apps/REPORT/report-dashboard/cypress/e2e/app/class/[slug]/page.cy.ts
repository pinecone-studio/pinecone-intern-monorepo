describe('Dynamic Page Component', () => {
  const mockStudents = [
    {
      id: '1',
      firstName: 'John Doe',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      studentCode: '12345',
      active: 'ACTIVE',
      profileImgUrl: 'https://res.cloudinary.com/deyylvaoy/image/upload/v1721308916/eoqmcvotks2gupl22ct7.jpg',
    },
  ];

  beforeEach(() => {
    cy.visit('/class/class-123');
  });

  it('should display loading state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetStudentByClassId') {
        req.reply({ delay: 1000, fixture: 'students.json' });
      }
    }).as('getStudents');

    cy.get('[data-testid="Loading"]').should('be.visible');
    cy.get('[data-testid="Loading"]').should('have.text', 'Loading...');
  });

  it('should display error state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetStudentByClassId') {
        req.reply({ forceNetworkError: true });
      }
    }).as('getStudentsError');

    cy.wait('@getStudentsError');
    cy.get('[data-testid="Error"]').should('be.visible');
    cy.contains('Error').should('be.visible');
  });

  it('should render StudentsTable when data is loaded', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetStudentByClassId') {
        req.reply({ body: { data: { getStudentsByClassId: mockStudents } } });
      }
    }).as('getStudentsSuccess');

    cy.wait('@getStudentsSuccess');

    cy.get('[data-testid="StudentsTable"]').should('exist');

    cy.get('[data-testid="StudentRow"]').should('have.length', mockStudents.length);

    mockStudents.forEach((student) => {
      cy.contains(student.firstName).should('be.visible');
      cy.contains(student.lastName).should('be.visible');
      cy.contains(student.phoneNumber).should('be.visible');
      cy.contains(student.email).should('be.visible');
      cy.contains(student.studentCode).should('be.visible');
      cy.contains('Идэвхтэй').should('be.visible');
    });
  });
});
