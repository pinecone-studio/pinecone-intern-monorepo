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
      profileImgUrl: '',
    },
  ];

  beforeEach(() => {
    cy.visit('/class/class-123');
  });

  it('should display loading state', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetStudentByClassId') {
        req.reply({ delay: 1000 });
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

    cy.visit('/class/class-123');
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
describe('StudentAddModal', () => {
  beforeEach(() => {
    cy.visit('/class/class-123');
    cy.get('[data-testid="openModalButton"]').click();
  });
  it('should open the modal and display all form elements', () => {
    cy.get('[data-testid="student-code-input"]').should('be.visible');
    cy.get('[data-testid="lastName-input"]').should('be.visible');
    cy.get('[data-testid="firstName-input"]').should('be.visible');
    cy.get('[data-testid="phone-number-input"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="radio-group"]').should('be.visible');
    cy.get('[data-testid="add-student-button"]').should('be.visible');
  });
  it('should validate form inputs', () => {
    cy.get('[data-testid="add-student-button"]').click();
    cy.contains('Сурагчийн код оруулна уу').should('be.visible');
    cy.contains('Овог оруулна уу').should('be.visible');
    cy.contains('Нэр оруулна уу').should('be.visible');
    cy.contains('Утасны дугаар оруулна уу').should('be.visible');
    cy.contains('Цахим хаяг оруулна уу').should('be.visible');
    cy.get('[data-testid="input"]').should('exist');
  });
  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="add-student-button"]').click();
    cy.contains('Цахим хаяг буруу форматтай').should('be.visible');
  });
  it('should toggle active/passive status', () => {
    cy.get('[data-testid="passive-radio-group-item"]').click();
    cy.get('[data-testid="active-radio-group-item"]').click();
  });
  it('should handle image upload', () => {
    cy.get('#dropzone-file').selectFile('public/profile.jpg', { force: true });
    cy.get('[data-testid="student-profile-image"]').should('be.visible');
  });
  it('should submit the form successfully', () => {
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/deyylvaoy/upload', {
      statusCode: 200,
      body: {},
    }).as('picupload');
    cy.get('#dropzone-file').selectFile('public/profile.jpg', { force: true });
    cy.get('[data-testid="student-code-input"]').type('12345');
    cy.get('[data-testid="lastName-input"]').type('Doe');
    cy.get('[data-testid="firstName-input"]').type('John');
    cy.get('[data-testid="phone-number-input"]').type('1234567890');
    cy.get('[data-testid="email-input"]').type('john.doe@example.com');
    cy.intercept('POST', '**/graphql', {
      statusCode: 200,
      body: { data: { createStudent: { id: '12345' } } },
    }).as('createStudent');
    cy.get('[data-testid="add-student-button"]').click();
    cy.wait('@picupload');
    cy.wait('@createStudent');
    cy.get('[data-cy="toast-message"]').should('be.visible').and('contain', 'Сурагч амжилттай нэмэгдлээ');
  });
  it('should handle submission error', () => {
    cy.intercept('POST', '/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Internal Server Error' }] },
    }).as('createStudentError');
    cy.get('[data-testid="student-code-input"]').type('12345');
    cy.get('[data-testid="lastName-input"]').type('Doe');
    cy.get('[data-testid="firstName-input"]').type('John');
    cy.get('[data-testid="phone-number-input"]').type('1234567890');
    cy.get('[data-testid="email-input"]').type('john.doe@example.com');
    cy.get('#dropzone-file').selectFile('public/profile.jpg', { force: true });
    cy.get('[data-testid="add-student-button"]').click();
    cy.wait('@createStudentError');
    cy.get('[data-cy="toast-message-error"]').should('be.visible').and('contain', 'Алдаа гарлаа Дахин оролдоно уу.');
  });
  it('should reset form after successful submission', () => {
    cy.intercept('POST', 'https://intern-federation-testing.vercel.app/graphql', {
      statusCode: 200,
      body: { data: { createStudent: { id: '12345' } } },
    }).as('createStudent');
    cy.get('[data-testid="student-code-input"]').type('12345');
    cy.get('[data-testid="lastName-input"]').type('Doe');
    cy.get('[data-testid="firstName-input"]').type('John');
    cy.get('[data-testid="phone-number-input"]').type('1234567890');
    cy.get('[data-testid="email-input"]').type('john.doe@example.com');
    cy.get('[data-testid="add-student-button"]').click();
    cy.wait('@createStudent');
    cy.get('[data-testid="student-code-input"]').should('have.value', '');
    cy.get('[data-testid="lastName-input"]').should('have.value', '');
    cy.get('[data-testid="firstName-input"]').should('have.value', '');
    cy.get('[data-testid="phone-number-input"]').should('have.value', '');
    cy.get('[data-testid="email-input"]').should('have.value', '');
  });
});
