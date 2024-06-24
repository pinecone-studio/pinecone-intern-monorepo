// cypress/integration/studentsTable.spec.js

// Example Student data for testing
const studentsData = [
  {
    firstName: 'Bataa',
    studentCode: '23lp5157@',
    email: 'Bataa@gmail.com',
    phoneNumber: '89898989',
    active: true,
    /* eslint-disable no-secrets/no-secrets */
    profileImgUrl: 'https://images.unsplash.com/photo-1500320464660-ee0ef7d0ae6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    firstName: 'HELLO',
    studentCode: '09876544',
    email: 'test@gmail.com',
    phoneNumber: '0000000000',
    active: true,
    /* eslint-disable no-secrets/no-secrets */
    profileImgUrl: 'https://images.unsplash.com/photo-1500320464660-ee0ef7d0ae6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    firstName: 'ewfwefwefew',
    studentCode: 'q2qw',
    email: 'afbbfe@gmail.com',
    phoneNumber: '88888888',
    active: true,
    /* eslint-disable no-secrets/no-secrets */
    profileImgUrl: 'https://images.unsplash.com/photo-1500320464660-ee0ef7d0ae6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
];

describe('Students Table', () => {
  beforeEach(() => {
    cy.visit('/student'); // Replace with your actual URL or route where the component is rendered
  });

  it('renders students table with correct headers', () => {
    cy.get('[data-testid="student-name"]').should('be.visible');
    cy.get('[data-testid="student-code"]').should('be.visible');
    cy.get('[data-testid="student-email"]').should('be.visible');
    cy.get('[data-testid="student-phone-number"]').should('be.visible');
    cy.get('[data-testid="stundet-state"]').should('be.visible');
  });

  it('displays students data correctly', () => {
    // Check if each student's data is displayed correctly in the table
    studentsData.forEach((student, index) => {
      cy.get('tbody').find(`[data-testid="students-name"]:eq(${index})`).should('contain.text', student.firstName);
      cy.get('tbody').find(`[data-testid="student-code"]:eq(${index})`).should('contain.text', student.studentCode);
      cy.get('tbody').find(`[data-testid="student-email"]:eq(${index})`).should('contain.text', student.email);
      cy.get('tbody').find(`[data-testid="student-phone-number"]:eq(${index})`).should('contain.text', student.phoneNumber);
      cy.get('tbody').find(`[data-testid="dropdown"]:eq(${index})`).click();
    });
  });

  it('displays profile images correctly', () => {
    // Check if profile images are displayed correctly
    studentsData.forEach((student, index) => {
      cy.get('tbody').find(`[data-testid="student-profile"]:eq(${index})`).should('have.attr', 'src', student.profileImgUrl);
    });
  });
});
