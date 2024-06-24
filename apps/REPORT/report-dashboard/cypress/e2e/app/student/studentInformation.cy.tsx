describe('StudentsInformation Component', () => {
  beforeEach(() => {
    cy.visit('/student');
  });

  it('renders loading state correctly', () => {
    cy.get('div').contains('Loading...').should('be.visible');
    cy.get('div').contains('Error').should('not.exist');
    cy.get('StudentsTable').should('not.exist');
  });

  it('renders error state correctly', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          errors: [{ message: 'Internal Server Error' }],
        },
      });
    });

    cy.get('div').contains('Loading...').should('not.exist');
    cy.get('div').contains('Error').should('be.visible');
    cy.get('StudentsTable').should('not.exist');
  });

  it('renders students data correctly', () => {
    const studentsData = [
      { _id: '6675450d73e83bdac7f3a703', firstName: 'Bataa', email: 'Bataa@gmail.com', studentCode: '23lp5157@', phoneNumber: '89898989' },
      { _id: '667561a13213f09af27657d5', firstName: 'HELLO', email: 'test@gmail.com', studentCode: '09876544', phoneNumber: '0000000000' },
      { _id: '6675635f3213f09af27657e5', firstName: 'ewfwefwefew', email: 'afbbfe@gmail.com', studentCode: 'q2qw', phoneNumber: '88888888' },
    ];
    cy.intercept('POST', '**/graphql', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            getStudentsByClassId: studentsData,
          },
        },
      });
    });

    cy.get('div').contains('Loading...').should('not.exist');
    cy.get('div').contains('Error').should('not.exist');
  });
});
