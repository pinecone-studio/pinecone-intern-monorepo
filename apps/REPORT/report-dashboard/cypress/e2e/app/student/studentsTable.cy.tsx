// cypress/integration/studentsTable.spec.js

// Example Student data for testing
const studentsData = [
  {
    firstName: 'BATAA',
    studentCode: '123456',
    email: 'test@gmail.com',
    phoneNumber: '90909909',
    active: true,
    profileImgUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?',
  },
  {
    firstName: 'BATAA',
    studentCode: '123456',
    email: 'test@gmail.com',
    phoneNumber: '90909909',
    active: true,
    profileImgUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?',
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
      cy.get('tbody').find(`[data-testid="student-name"]:eq(${index})`).should('contain.text', student.firstName);
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
